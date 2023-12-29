import { Flex, Box, Text, InputGroup, Input, InputRightElement, Button, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { NotificationsLogo, UnlikeLogo, CommentLogo } from "../../assets/constants";
import useCreateComment from "../../hooks/useCreateComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({ post, creatorProfile, isProfilePage }) => {
	const { isLiked, likesCount, handleLikePost } = useLikePost(post);
	const [comment, setComment] = useState("");
	const { isCommenting, handleCreateComment } = useCreateComment();
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSubmitComment = async () => {
		await handleCreateComment(post.id, comment);
		setComment("");
	};

	return (
		<Box mb={10} marginTop={"auto"}>
			<Flex alignItems={"center"} gap={4} width={"full"} pt={0} mt={4} mb={2}>
				<Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
					{!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
				</Box>
				<Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
					<CommentLogo />
				</Box>
			</Flex>

			<Text fontWeight={600} fontSize={"sm"}>
				{likesCount} {likesCount === 1 ? "like" : "likes"}
			</Text>

			{isProfilePage && (
				<Text fontSize={12} color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}

			{!isProfilePage && (
				<>
					<Text fontSize={"sm"} fontWeight={700}>
						{creatorProfile?.username}
						<Text as="span" ml={2} fontWeight={400}>
							{post.caption}
						</Text>
					</Text>
					{post.comments.length > 0 && (
						<Text fontSize={14} color={"gray"} cursor={"pointer"} onClick={onOpen}>
							See all {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
						</Text>
					)}
					{/* Comments modal only at Home page */}
					{!isProfilePage && isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />}
				</>
			)}
			{authUser && (
				<Flex alignItems={"center"} justifyContent={"space-between"} gap={2} w={"full"}>
					<InputGroup>
						<Input
							variant={"flushed"}
							placeholder="Add a comment..."
							fontSize={14}
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							ref={commentRef}
						/>
						<InputRightElement>
							<Button
								fontSize={14}
								color={"blue.500"}
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: "white" }}
								bg={"transparent"}
								onClick={handleSubmitComment}
								isLoading={isCommenting}
							>
								Post
							</Button>
						</InputRightElement>
					</InputGroup>
				</Flex>
			)}
		</Box>
	);
};

export default PostFooter;
