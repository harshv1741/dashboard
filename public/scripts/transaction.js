const projectName = sessionStorage.getItem("projectName");
const pName = document.querySelector("#pName");
pName.textContent = projectName;
console.log();

const transactionsRef = db
	.collection("projects")
	.doc(projectName)
	.collection("transactions");

const table = document.querySelector("table");
const tbody = table.querySelector("tbody");
const totalRow = table.querySelector(".total-row");
const totalCell = totalRow.querySelector(".total");
const addRowButton = document.querySelector(".add-row-button");
const formContainer = document.querySelector(".form-container");
const form = formContainer.querySelector("form");
const cancelButton = formContainer.querySelector(".cancel-button");
const noTransactionMessage = document.querySelector(".no-transaction-message");

let transactions = [];

function calculateTotal() {
	const total = transactions.reduce((acc, cur) => acc + cur.price, 0);
	const totalText = total.toLocaleString("en-IN", {
		style: "currency",
		currency: "INR",
	});
	totalCell.textContent = totalText;
}

function render() {
	tbody.innerHTML = "";
	transactions = []; // clear transactions array

	transactionsRef.get().then((querySnapshot) => {
		if (querySnapshot.size === 0) {
			// show "No Transaction" message
			const noTransactionMessage = document.querySelector(
				".no-transaction-message"
			);
			noTransactionMessage.style.display = "block";
			table.style.display = "none";
		} else {
			// hide "No Transaction" message
			const noTransactionMessage = document.querySelector(
				".no-transaction-message"
			);
			noTransactionMessage.style.display = "none";
			table.style.display = "block";

			querySnapshot.forEach((doc) => {
				const transaction = doc.data();
				transactions.push(transaction); // add transaction to transactions array
				const row = document.createElement("tr");

				const dateCell = document.createElement("td");
				dateCell.textContent = transaction.date;
				row.appendChild(dateCell);

				const descriptionCell = document.createElement("td");
				descriptionCell.textContent = transaction.description;
				row.appendChild(descriptionCell);

				const priceCell = document.createElement("td");
				const priceText = transaction.price.toLocaleString("en-IN", {
					style: "currency",
					currency: "INR",
				});
				priceCell.textContent = priceText;
				row.appendChild(priceCell);

				const deleteCell = document.createElement("td");
				const deleteButton = document.createElement("button");
				deleteButton.classList.add("delete-row-button");
				deleteButton.textContent = "Delete";
				deleteButton.addEventListener("click", () => {
					transactionsRef
						.doc(doc.id)
						.delete()
						.then(() => {
							console.log("Transaction deleted successfully!");
							tbody.removeChild(row); // remove row from tbody
							transactions = transactions.filter(
								(t) => t.date !== transaction.date // remove transaction from transactions array
							);
							calculateTotal(); // recalculate total

							if (tbody.children.length === 0) {
								// show "No Transaction" message
								const noTransactionMessage = document.querySelector(
									".no-transaction-message"
								);
								noTransactionMessage.style.display = "block";
								table.style.display = "none";
							}
						})
						.catch((error) => {
							console.error("Error deleting transaction: ", error);
						});
				});
				deleteCell.appendChild(deleteButton);
				row.appendChild(deleteCell);

				tbody.appendChild(row);
			});

			calculateTotal(); // calculate total
		}
	});
}

function addTransaction(date, description, price) {
	transactionsRef
		.add({
			date: date,
			description: description,
			price: price,
		})
		.then(() => {
			console.log("Transaction added successfully!");
		})
		.catch((error) => {
			console.error("Error adding transaction: ", error);
		});

	setTimeout(() => window.location.reload(), 1000);
}

function handleSubmit(event) {
	event.preventDefault();
	const date = form.date.value;
	const description = form.description.value;
	const price = parseFloat(form.price.value);
	addTransaction(date, description, price);
	form.reset();
	formContainer.style.display = "none";
}

addRowButton.addEventListener("click", () => {
	formContainer.style.display = "block";
	noTransactionMessage.style.display = "none";
});

cancelButton.addEventListener("click", () => {
	form.reset();
	formContainer.style.display = "none";
	noTransactionMessage.style.display = "block";
});

form.addEventListener("submit", handleSubmit);
render();
