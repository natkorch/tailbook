import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
	const [isLoading, setIsLoading] = useState(true);
	const { userProfile, setUserProfile } = useUserProfileStore();
	const showToast = useShowToast();

	useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
      setUserProfile(null);
			try {
				const q = query(collection(firestore, "users"), where("username", "==", username));
				const querySnapshot = await getDocs(q);

				if (querySnapshot.empty) return setUserProfile(null);

				let userDoc;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});
				setUserProfile(userDoc);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		getUserProfile();
	}, [setUserProfile, username, showToast]);

	return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
