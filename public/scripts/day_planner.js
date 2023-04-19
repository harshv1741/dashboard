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

form.addEventListener("submit", function (event) {
	event.preventDefault();

	const name = document.getElementById("task-name").value;
	const time = document.getElementById("task-time").value;
	const completed = document.getElementById("task-completed").checked;
	const addTaskBtn = document.getElementById("task-completed");

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
		completedCheckbox.checked ? "Yes" : "No";
	});
	completedCell.innerHTML = "";
	completedCell.appendChild(completedCheckbox);

	form.reset();

	addTaskBtn.addEventListener("click", hideAddTaskForm());
});
