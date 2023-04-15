// Add form submit event listener
document
	.getElementById("projectForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		var projectName = document.getElementById("projectName").value;

		// Set project name as document name in Firestore
		db.collection("projects")
			.doc(projectName)
			.set({})
			.then(function () {
				console.log("Project added with name: ", projectName);
				document.getElementById("projectName").value = "";
			})
			.catch(function (error) {
				console.error("Error adding project: ", error);
			});
	});

// Listen for real-time updates on Firestore collection
db.collection("projects").onSnapshot(function (querySnapshot) {
	var projectList = document.getElementById("projectList");
	projectList.innerHTML = ""; // Clear the list before re-rendering

	querySnapshot.forEach(function (doc) {
		var li = document.createElement("li");
		li.textContent = doc.id;
		li.style.cursor = "pointer"; // Add cursor style for clickable element

		var deleteButton = document.createElement("button");
		deleteButton.style.marginLeft = "10px";
		deleteButton.textContent = "Delete";
		deleteButton.setAttribute("data-id", doc.id);
		deleteButton.addEventListener("click", function (event) {
			event.stopPropagation(); // Prevent event propagation
			var projectId = this.getAttribute("data-id");

			// Delete project from Firestore
			db.collection("projects")
				.doc(projectId)
				.delete()
				.then(function () {
					console.log("Project deleted with name: ", projectId);
				})
				.catch(function (error) {
					console.error("Error deleting project: ", error);
				});
		});

		li.addEventListener("click", function () {
			// Redirect to material.html with project name as query parameter
			var projectName = this.textContent;
			window.location.href =
				"material.html?projectName=" + encodeURIComponent(projectName);
		});

		li.appendChild(deleteButton);
		projectList.appendChild(li);
	});
});
