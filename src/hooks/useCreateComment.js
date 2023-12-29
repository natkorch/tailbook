import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const useCreateComment = () => {
	const [isCommenting, setIsCommenting] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const addComment = usePostStore((state) => state.addComment);
	const showToast = useShowToast();

	const handleCreateComment = async (postId, comment) => {
		setIsCommenting(true);
		try {
			if (isCommenting) return;
			if (!authUser) throw Error("You must be loggin in to comment");

			const newComment = {
				comment: comment,
				createdAt: Date.now(),
				createdBy: authUser.uid,
				postId: postId,
			};

			await updateDoc(doc(firestore, "posts", postId), {
				comments: arrayUnion(newComment),
			});

			addComment(postId, newComment);
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsCommenting(false);
		}
	};

	return { isCommenting, handleCreateComment };
};

export default useCreateComment;
