// Array to store transaction data
var transactions = [];

// Function to add a new transaction
function addTransaction() {
	var transactionId = transactions.length + 1;
	var date = prompt("Enter transaction date (YYYY-MM-DD):");
	var description = prompt("Enter transaction description:");
	var amount = prompt("Enter transaction amount:");
	var transaction = [transactionId, date, description, amount];
	transactions.push(transaction);
	updateTable();
}

// Function to delete a transaction
function deleteTransaction(transactionId) {
	var index = transactionId - 1;
	transactions.splice(index, 1);
	updateTable();
}

// Function to update the table with current transaction data
function updateTable() {
	var table = document.getElementById("transactionTable");
	var tbody = table.getElementsByTagName("tbody")[0];
	tbody.innerHTML = ""; // Clear existing rows
	for (var i = 0; i < transactions.length; i++) {
		var row = tbody.insertRow();
		for (var j = 0; j < transactions[i].length; j++) {
			var cell = row.insertCell();
			cell.textContent = transactions[i][j];
		}
		var actionCell = row.insertCell();
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.onclick = (function (index) {
			return function () {
				deleteTransaction(index + 1);
			};
		})(i);
		actionCell.appendChild(deleteButton);
	}
}
