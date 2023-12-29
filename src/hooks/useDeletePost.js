import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import { updateDoc, doc, arrayRemove, deleteDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import useProfileStore from "../store/userProfileStore";

const useDeletePost = () => {
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostCount = useProfileStore((state) => state.decrementPost);

	const handleDeletePost = async (post) => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		if (isLoading) return;

		setIsLoading(true);
		try {
			const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);

			await deleteDoc(doc(firestore, "posts", post.id));

			const userRef = doc(firestore, "users", authUser.uid);
			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostCount(post.id);

			showToast("Success", "Post deleted successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleDeletePost };
};

export default useDeletePost;
