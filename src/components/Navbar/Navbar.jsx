import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
	return (
		<Container maxW={"container.lg"} my={4}>
			<Flex w={"full"} justifyContent={{ base: "center", sm: "space-between" }} alignItems={"center"}>
				<Image src="/logo.png" h={20} display={{ base: "none", sm: "block" }} cursor={"pointer"} />
				<Flex gap={4}>
					<RouterLink to={"/auth"}>
						<Button colorScheme={"blue"} size={"sm"}>
							Log in
						</Button>
					</RouterLink>
					<RouterLink to={"/auth"}>
						<Button variant={"outline"} size={"sm"}>
							Sign up
						</Button>
					</RouterLink>
				</Flex>
			</Flex>
		</Container>
	);
};

export default Navbar;
