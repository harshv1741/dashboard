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

document
	.getElementById("deleteForm")
	.addEventListener("submit", function (event) {});

// Listen for real-time updates on Firestore collection
db.collection("projects").onSnapshot(function (querySnapshot) {
	var projectList = document.getElementById("projectList");
	projectList.innerHTML = "";
	// Clear the list before re-rendering

	querySnapshot.forEach(function (doc) {
		var li = document.createElement("li");
		li.textContent = doc.id;
		li.style.cursor = "pointer"; // Add cursor style for clickable element

		li.addEventListener("click", function () {
			// Save project name to local storage
			var projectName = this.textContent;
			localStorage.setItem("projectName", projectName);

			// Redirect to day_planner.html
			window.location.href = "day_planner.html";
		});

		projectList.appendChild(li);
	});
});
