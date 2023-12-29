import { Flex, Image, Text } from "@chakra-ui/react";
import useGoogleLogin from "../../hooks/useGoogleLogin";

const GoogleAuth = ({prefix}) => {
  const { login } = useGoogleLogin();

	return (
		<Flex justifyContent={"center"} alignItems={"center"} cursor={"pointer"}>
			<Image src="/google.png" w={5} alt="Google logo" />
			<Text mx={2} color={"blue.500"} onClick={login} >
				{prefix} with Google
			</Text>
		</Flex>
	);
};

export default GoogleAuth;
