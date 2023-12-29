import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const showToast = useShowToast();
	const maxFileSize = 2 * 1024 * 1024; // 2Mb

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (!file || !file.type.startsWith("image/")) {
			showToast("Error", "Select an image file", "error");
			setSelectedFile(null);
			return;
		}
		if (file.size > maxFileSize) {
			showToast("Error", "File size should be no more than 2 Mb", "error");
			setSelectedFile(null);
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setSelectedFile(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	};

	return { selectedFile, setSelectedFile, handleImageChange };
};

export default usePreviewImg;
