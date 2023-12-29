import { Avatar, AvatarGroup, Flex, VStack, Text, Button, useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";

const ProfileHeader = () => {
	const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isVisitingOwnProfile = authUser.username === userProfile.username;

	return (
		<Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
			<AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
				<Avatar src={userProfile.profilePicURL} alt="user avatar"></Avatar>
			</AvatarGroup>

			<VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
				<Flex
					gap={4}
					direction={{ base: "column", sm: "row" }}
					justifyContent={{ base: "center", sm: "flex-start" }}
					alignItems={"center"}
					w={"full"}
				>
					<Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.username}</Text>

					{authUser && isVisitingOwnProfile && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"white"}
								color={"black"}
								_hover={{ bg: "whiteAlpha.800" }}
								size={{ base: "xs", md: "sm" }}
								onClick={onOpen}
							>
								Edit profile
							</Button>
						</Flex>
					)}

					{authUser && !isVisitingOwnProfile && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"blue.500"}
								color={"white"}
								_hover={{ bg: "blue.600" }}
								size={{ base: "xs", md: "sm" }}
								isLoading={isUpdating}
								onClick={handleFollowUser}
							>
								{isFollowing ? "Unfollow" : "Follow"}
							</Button>
						</Flex>
					)}
				</Flex>

				<Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as="span" fontWeight={"bold"} mr={1}>
							{userProfile.posts.length}
						</Text>
						{userProfile.posts.length === 1 ? "post" : "posts"}
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as="span" fontWeight={"bold"} mr={1}>
							{userProfile.followers.length}
						</Text>
						{userProfile.followers.length === 1 ? "follower" : "followers"}
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as="span" fontWeight={"bold"} mr={1}>
							{userProfile.following.length}
						</Text>
						following
					</Text>
				</Flex>
				<Flex alignItems={"center"} gap={4}>
					<Text fontSize={"sm"} fontWeight={"bold"}>
						{userProfile.fullName}
					</Text>
				</Flex>
				<Text fontSize={"sm"}>{userProfile.bio}</Text>
			</VStack>
			{isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
		</Flex>
	);
};

export default ProfileHeader;
