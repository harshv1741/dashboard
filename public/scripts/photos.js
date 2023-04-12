async function uploadFile() {
	// Get the selected file
	var file = document.getElementById("fileInput").files[0];

	// Create a storage reference with a unique filename
	var fileName = Date.now() + "_" + file.name;
	var fileRef = storageRef.child(fileName);

	// Upload the file to Firebase Storage
	fileRef
		.put(file)
		.then(async function (snapshot) {
			console.log("File uploaded successfully!");

			// Get the download URL of the uploaded file
			var url = await fileRef.getDownloadURL();

			// Display the uploaded image in an HTML tag
			var uploadedImage = document.getElementById("uploadedImage");
			uploadedImage.src = url;
		})
		.catch(function (error) {
			console.error("Error uploading file:", error);
			// You can handle errors here, such as displaying an error message
		});
}
