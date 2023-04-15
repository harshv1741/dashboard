var storage = firebase.storage();
var storageRef = storage.ref();
var photoList = document.getElementById("photoList");
var photoDisplay = document.getElementById("photoDisplay"); // Get the photo display div element

// Upload photo
function uploadPhoto() {
	var file = document.getElementById("photoInput").files[0];
	var fileName = file.name;
	var fileRef = storageRef.child(fileName);

	fileRef
		.put(file)
		.then(function (snapshot) {
			console.log("Uploaded a file:", snapshot.metadata.fullPath);
			addPhotoToList(fileName);
		})
		.catch(function (error) {
			console.error("Failed to upload file:", error);
		});
}

// Delete photo
function deletePhoto(fileName) {
	var fileRef = storageRef.child(fileName);

	fileRef
		.delete()
		.then(function () {
			console.log("Deleted file:", fileName);
			removePhotoFromList(fileName);
		})
		.catch(function (error) {
			console.error("Failed to delete file:", error);
		});
}

// View photo
function viewPhoto(fileName) {
	var fileRef = storageRef.child(fileName);
	fileRef
		.getDownloadURL()
		.then(function (url) {
			// Set the src attribute of the img element to the download URL
			var img = document.createElement("img");
			img.src = url;
			photoDisplay.innerHTML = ""; // Clear previous image display
			photoDisplay.appendChild(img);
		})
		.catch(function (error) {
			console.error("Failed to get download URL:", error);
		});
}

// Add photo to the list
function addPhotoToList(fileName) {
	var listItem = document.createElement("li");
	listItem.textContent = fileName;
	var viewButton = document.createElement("button");
	viewButton.textContent = "View";
	viewButton.onclick = function () {
		viewPhoto(fileName);
	};
	listItem.appendChild(viewButton);
	var deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.onclick = function () {
		deletePhoto(fileName);
	};
	listItem.appendChild(deleteButton);
	photoList.appendChild(listItem);
}

// Remove photo from the list
function removePhotoFromList(fileName) {
	var listItem = document.getElementById(fileName);
	listItem.remove();
}
