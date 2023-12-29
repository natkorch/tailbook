import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
	const toast = useToast();
	// useCallback is used to prevent infinite loop by chashing the functions
	const showToast = useCallback(
		(title, description, status) => {
			toast({
				title: title,
				description: description,
				status: status,
				duration: null,
				isClosable: true,
			});
		},
		[toast]
	);

	return showToast;
};

export default useShowToast;
