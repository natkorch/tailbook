import {
	Flex,
	GridItem,
	Text,
	Image,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	Avatar,
	Divider,
	VStack,
	Button,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../PostContent/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useDeletePost from "../../hooks/useDeletePost";
import Caption from "../PostContent/Caption";

const ProfilePost = ({ post }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const { isLoading, handleDeletePost } = useDeletePost(post);

	return (
		<>
			<GridItem
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				border={"1px solid"}
				borderColor={"whiteAlpha.300"}
				position={"relative"}
				aspectRatio={1 / 1}
				onClick={onOpen}
			>
				<Flex
					opacity={0}
					_hover={{ opacity: 1 }}
					position={"absolute"}
					top={0}
					left={0}
					bottom={0}
					right={0}
					bg={"blackAlpha.700"}
					transition={"all 0.3s ease"}
					zIndex={1}
					justifyContent={"center"}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={50}>
						<Flex>
							<AiFillHeart size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.likes.length}
							</Text>
						</Flex>
						<Flex>
							<FaComment size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.comments.length}
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Image src={post.imageURL} alter="Post" w={"100%"} h={"100%"} objectFit={"cover"} />
			</GridItem>
			<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody bg={"black"} pb={5}>
						<Flex
							gap={4}
							w={{ base: "90%", sm: "70%", md: "full" }}
							mx={"auto"}
							maxH={"90vh"}
							minH={"50vh"}
						>
							<Flex
								borderRadius={4}
								overflow={"hidden"}
								border={"1px solid"}
								borderColor={"whiteAlpha.300"}
								flex={1.5}
								alignItems={"center"}
								justifyContent={"center"}
							>
								<Image src={post.imageURL} alt="Post image" />
							</Flex>

							<Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
								<Flex alignItems={"center"} justifyContent={"space-between"}>
									<Flex alignItems={"center"} gap={4}>
										<Avatar src={userProfile?.profilePicURL} size={"sm"} />
										<Text fontSize={12} fontWeight={"bold"}>
											{userProfile?.username}
										</Text>
									</Flex>

									{userProfile?.uid === authUser?.uid && (
										<Button
											size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={6}
											p={1}
											onClick={() => handleDeletePost(post)}
											isLoading={isLoading}
										>
											<MdDelete size={20} cursor={"pointer"} />
										</Button>
									)}
								</Flex>

								<Divider my={4} bg={"gray.500"} />
								<VStack w="full" alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
									{/* Caption*/}
									{post.caption && <Caption post={post} />}
									{/* Comments*/}
									{post.comments.map((comment, idx) => (
										<Comment key={idx} comment={comment} />
									))}
								</VStack>

								<Divider my={4} bg={"gray.800"} />
								<PostFooter isProfilePage={true} post={post} />
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfilePost;
