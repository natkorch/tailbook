import {
	Box,
	Button,
	CloseButton,
	Flex,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useCreatePost from "../../hooks/useCreatePost";
import { useLocation } from "react-router-dom";

const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [caption, setCaption] = useState("");
	const imageRef = useRef(null);
	const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImg(imageRef);
	const { isLoading, handleCreatePost } = useCreatePost();
  const { pathname } = useLocation();

	const handlePostCreation = async () => {
		await handleCreatePost(selectedFile, caption, pathname);
		onClose();
		setCaption("");
		setSelectedFile(null);
	};

	return (
		<>
			<Tooltip
				hasArrow
				label={"Create"}
				placement="right"
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<CreatePostLogo />
					<Box display={{ base: "none", md: "block" }}>Create</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
				<ModalOverlay />
				<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
					<ModalHeader>Create post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea
							placeholder="Post caption..."
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
						/>
						<Input type="file" hidden ref={imageRef} onChange={handleImageChange} />
						<BsFillImageFill
							onClick={() => imageRef.current.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>
						{selectedFile && (
							<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
								<Image src={selectedFile} alt="Selected image" />
								<CloseButton
									position={"absolute"}
									top={2}
									right={2}
									onClick={() => setSelectedFile(null)}
                  disabled={isLoading}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button mr={3} isLoading={isLoading} onClick={handlePostCreation}>
							{" "}
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;
