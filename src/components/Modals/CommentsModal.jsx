import {
	Flex,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	Button,
	ModalHeader,
} from "@chakra-ui/react";
import Comment from "../PostContent/Comment";
import useCreateComment from "../../hooks/useCreateComment";
import { useEffect, useRef } from "react";

const CommentsModal = ({ isOpen, onClose, post }) => {
	const { isCommenting, handleCreateComment } = useCreateComment();
	const commentRef = useRef(null);
	const commentsContainerRef = useRef(null);

	const handleCommentSubmit = async (e) => {
		// prevent page refresh
		e.preventDefault();
		await handleCreateComment(post.id, commentRef.current.value);
		commentRef.current.value = "";
	};

	useEffect(() => {
		const scrollToBottom = () => {
			commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
		};
		if (isOpen) {
			setTimeout(() => {
				scrollToBottom();
			}, 0);
		}
	}, [isOpen, post.comments.length]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex
						mb={4}
						gap={4}
						flexDir={"column"}
						maxH={"250px"}
						overflowY={"auto"}
						ref={commentsContainerRef}
					>
						{post.comments.map((comment, idx) => (
							<Comment key={idx} comment={comment} />
						))}
					</Flex>
					<form onSubmit={handleCommentSubmit} style={{ marginTop: "2rem" }}>
						<Input placeholder="Comment" size={"sm"} ref={commentRef} />
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button type="submit" ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CommentsModal;
