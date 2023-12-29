import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

const useGoogleLogin = () => {
	const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
	const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

	const login = async () => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}

			const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			} else {
				const username = newUser.user.email.split("@")[0];
				const usersRef = collection(firestore, "users");
				const q = query(usersRef, where("username", "==", username));
				const querySnapshot = await getDocs(q);
				if (!querySnapshot.empty) {
					showToast("Error", `Username ${username} already exists", "error`);
					return;
				}

				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: username,
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { login };
};

export default useGoogleLogin;
