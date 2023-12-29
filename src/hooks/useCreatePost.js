import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { addDoc, arrayUnion, collection, updateDoc, doc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const useCreatePost = () => {
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const createPost = usePostStore((state) => state.createPost);
	const incrementPostCount = useUserProfileStore((state) => state.incrementPostCount);

	const handleCreatePost = async (selectedFile, caption, pathname) => {
		setIsLoading(true);
		try {
			if (!selectedFile) throw new Error("Select an image");
			const newPost = {
				caption: caption,
				likes: [],
				comments: [],
				createdAt: Date.now(),
				createdBy: authUser.uid,
			};

			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);
			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);
			await updateDoc(postDocRef, { imageURL: downloadURL });

      if (pathname === `/${authUser.username}`){
        newPost.imageURL = downloadURL;
        newPost.id = postDocRef.id;
        createPost(newPost);
        incrementPostCount(newPost);
      }

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
};

export default useCreatePost;
