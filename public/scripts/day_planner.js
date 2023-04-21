// Initialize Firestore

// JavaScript to update the date displayed on the page
const date = new Date();
const dayElement = document.getElementById("day");
const monthYearElement = document.getElementById("month-year");
const addTaskForm = document.getElementById("add-task-form");

// Set the initial date values
updateDate();

function updateDate() {
	// Set the date object to the current date
	const date = new Date();

	// Update the day value
	const day = date.getDate();
	dayElement.innerText = day;

	// Update the month and year value
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();
	monthYearElement.innerText = `${month} ${year}`;
}

// Function to show the add task form
function showAddTaskForm() {
	addTaskForm.style.display = "block";
}

function hideAddTaskForm() {
	addTaskForm.style.display = "none";
}

// Table Data Adding
const form = document.getElementById("task-form");
const table = document.getElementById("task-table");

// Retrieve the tasks from Firestore and display them in the table
db.collection("tasks")
	.get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			const task = doc.data();
			const newRow = table.insertRow();
			const nameCell = newRow.insertCell(0);
			const timeCell = newRow.insertCell(1);
			const completedCell = newRow.insertCell(2);
			nameCell.textContent = task.name;
			timeCell.textContent = task.time;
			const completedCheckbox = document.createElement("input");
			completedCheckbox.type = "checkbox";
			completedCheckbox.checked = task.completed;
			completedCheckbox.addEventListener("change", function () {
				db.collection("tasks")
					.doc(doc.id)
					.update({ completed: completedCheckbox.checked });
			});
			completedCell.innerHTML = "";
			completedCell.appendChild(completedCheckbox);
		});
	});

form.addEventListener("submit", function (event) {
	event.preventDefault();

	const name = document.getElementById("task-name").value;
	const time = document.getElementById("task-time").value;
	const completed = document.getElementById("task-completed").checked;

	// Create a new document in the "tasks" collection with the task data
	db.collection("tasks")
		.add({
			name: name,
			time: time,
			completed: completed,
		})
		.then((docRef) => {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});

	const newRow = table.insertRow();
	const nameCell = newRow.insertCell(0);
	const timeCell = newRow.insertCell(1);
	const completedCell = newRow.insertCell(2);

	nameCell.textContent = name;
	timeCell.textContent = time;

	// Create checkbox element for completed column
	const completedCheckbox = document.createElement("input");
	completedCheckbox.type = "checkbox";
	completedCheckbox.checked = completed;
	completedCheckbox.addEventListener("change", function () {
		db.collection("tasks")
			.doc(docRef.id)
			.update({ completed: completedCheckbox.checked });
	});
	completedCell.innerHTML = "";
	completedCell.appendChild(completedCheckbox);

	form.reset();
	hideAddTaskForm();
});
