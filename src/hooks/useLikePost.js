import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const useLikePost = (post) => {
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const [likesCount, setLikesCount] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
	const showToast = useShowToast();
  const likePost = usePostStore(state => state.likePost)

	const handleLikePost = async () => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			if (!authUser) throw Error("You must be logged in to like a post");

			const postRef = doc(firestore, "posts", post.id);
			await updateDoc(postRef, {
				likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			});

      likePost(post.id, authUser.uid, isLiked)

			setIsLiked(!isLiked);
			setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};
	return { isLiked, likesCount, isLoading, handleLikePost };
};

export default useLikePost;
