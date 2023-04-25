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
		window.location.reload();
	});

// Add event listener for delete button in popup form
document
	.getElementById("deleteForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		var projectName = document.getElementById("deleteProjectName").value;

		// Delete project document from Firestore
		db.collection("projects")
			.doc(projectName)
			.delete()
			.then(function () {
				console.log("Project deleted with name: ", projectName);
				// Hide delete popup form
				hideDeletePopup();
			})
			.catch(function (error) {
				console.error("Error deleting project: ", error);
			});
	});

// Listen for real-time updates on Firestore collection
db.collection("projects").onSnapshot(function (querySnapshot) {
	var projectList = document.getElementById("projectList");
	projectList.innerHTML = "";
	// Clear the list before re-rendering

	querySnapshot.forEach(function (doc) {
		var div = document.createElement("div"); // Create a new div element
		var li = document.createElement("li");
		li.textContent = doc.id;
		li.style.cursor = "pointer"; // Add cursor style for clickable element

		// Adding Div Styling
		div.style.backgroundColor = "#ccc";
		div.style.display = "flex";
		div.style.justifyContent = "space-between";
		div.style.alignItems = "center";
		div.style.padding = "10px";
		div.style.margin = "10px";
		div.style.borderRadius = "20px";

		li.addEventListener("click", function () {
			// Save project name to local storage
			var projectName = this.textContent;
			localStorage.setItem("projectName", projectName);
			// Redirect to day_planner.html
			window.location.href = "day_planner.html";
		});

		div.appendChild(li); // Append the li element as a child of the div
		projectList.appendChild(div);
	});
});
