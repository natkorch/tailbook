import { VStack, Flex, Text, Box } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
	const { isLoading, suggestedUsers } = useGetSuggestedUsers();

	// Optional: show skeleton
	if (isLoading) return null;

	return (
		<VStack py={8} px={6} gap={4}>
			<SuggestedHeader />

			{suggestedUsers.some(x => x) && (
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested to you
					</Text>
					<Text fontSize={12} fontWeight={"bold"} cursor={"pointer"} _hover={{ color: "gray.400" }}>
						See all
					</Text>
				</Flex>
			)}

			{suggestedUsers.map((user) => (
				<SuggestedUser key={user.id} user={user} />
			))}

			<Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
				© 2023 Build by me
			</Box>
		</VStack>
	);
};

export default SuggestedUsers;
