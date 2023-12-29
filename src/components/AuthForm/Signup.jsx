import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, Button, InputGroup, InputRightElement, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import useSignupWithEmailAndPassword from "../../hooks/useSignupWithEmailAndPassword";

const Signup = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const { loading, error, signup } = useSignupWithEmailAndPassword();

	return (
		<>
			<Input
				placeholder="Email"
				type="email"
				fontSize={14}
				size={"sm"}
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<Input
				placeholder="Username"
				type="text"
				fontSize={14}
				size={"sm"}
				value={inputs.username}
				onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
			/>
			<Input
				placeholder="Full name"
				type="text"
				fontSize={14}
				size={"sm"}
				value={inputs.fullName}
				onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
			/>
			<InputGroup>
				<Input
					placeholder="Password"
					type={showPassword ? "text" : "password"}
					fontSize={14}
					size={"sm"}
					value={inputs.password}
					onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				/>
				<InputRightElement h="full">
					<Button
						variant={"ghost"}
						size={"sm"}
						isLoading={loading}
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <ViewIcon /> : <ViewOffIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>

			{error && (
				<Alert status="error" fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}

			<Button w={"full"} fontSize={14} colorScheme="blue" size={"sm"} onClick={() => signup(inputs)}>
				Sign up
			</Button>
		</>
	);
};

export default Signup;
