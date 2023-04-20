// // JavaScript code
// const transactionsRef = db.collection("transactions");

// const table = document.querySelector("table");
// const tbody = table.querySelector("tbody");
// const totalRow = table.querySelector(".total-row");
// const totalCell = totalRow.querySelector(".total");
// const addRowButton = document.querySelector(".add-row-button");
// const deleteRowButton = document.querySelector(".delete-row-button");
// const formContainer = document.querySelector(".form-container");
// const form = formContainer.querySelector("form");
// const cancelButton = formContainer.querySelector(".cancel-button");

// let transactions = [];

// function render() {
// 	tbody.innerHTML = "";

// 	transactionsRef.get().then((querySnapshot) => {
// 		querySnapshot.forEach((doc) => {
// 			const transaction = doc.data();
// 			const row = document.createElement("tr");

// 			const dateCell = document.createElement("td");
// 			dateCell.textContent = transaction.date;
// 			row.appendChild(dateCell);

// 			const descriptionCell = document.createElement("td");
// 			descriptionCell.textContent = transaction.description;
// 			row.appendChild(descriptionCell);

// 			const priceCell = document.createElement("td");
// 			const priceText = transaction.price.toLocaleString("en-IN", {
// 				style: "currency",
// 				currency: "INR",
// 			});
// 			priceCell.textContent = priceText;
// 			row.appendChild(priceCell);

// 			tbody.appendChild(row);
// 		});

// 		const total = transactions.reduce((acc, cur) => acc + cur.price, 0);
// 		const totalText = total.toLocaleString("en-IN", {
// 			style: "currency",
// 			currency: "INR",
// 		});
// 		totalCell.textContent = totalText;
// 	});
// }

// function addTransaction(date, description, price) {
// 	transactionsRef
// 		.add({
// 			date: date,
// 			description: description,
// 			price: price,
// 		})
// 		.then(() => {
// 			console.log("Transaction added successfully!");
// 		})
// 		.catch((error) => {
// 			console.error("Error adding transaction: ", error);
// 		});
// }

// function handleSubmit(event) {
// 	event.preventDefault();
// 	const date = form.date.value;
// 	const description = form.description.value;
// 	const price = parseFloat(form.price.value);
// 	addTransaction(date, description, price);
// 	form.reset();
// 	formContainer.style.display = "none";
// }

// addRowButton.addEventListener("click", () => {
// 	formContainer.style.display = "block";
// });

// cancelButton.addEventListener("click", () => {
// 	form.reset();
// 	formContainer.style.display = "none";
// });

// form.addEventListener("submit", handleSubmit);
// render();

const transactionsRef = db.collection("transactions");

const table = document.querySelector("table");
const tbody = table.querySelector("tbody");
const totalRow = table.querySelector(".total-row");
// const totalCell = totalRow.querySelector(".total");
const addRowButton = document.querySelector(".add-row-button");
const formContainer = document.querySelector(".form-container");
const form = formContainer.querySelector("form");
const cancelButton = formContainer.querySelector(".cancel-button");

let transactions = [];

function render() {
	tbody.innerHTML = "";

	let total = 0; // initialize total to zero

	transactionsRef.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			const transaction = doc.data();
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
					})
					.catch((error) => {
						console.error("Error deleting transaction: ", error);
					});
				row.remove();
			});
			deleteCell.appendChild(deleteButton);
			row.appendChild(deleteCell);

			tbody.appendChild(row);
		});

		const total = transactions.reduce((acc, cur) => acc + cur.price, 0);
		const totalText = total.toLocaleString("en-IN", {
			style: "currency",
			currency: "INR",
		});
		totalCell.textContent = totalText;
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
});

cancelButton.addEventListener("click", () => {
	form.reset();
	formContainer.style.display = "none";
});

form.addEventListener("submit", handleSubmit);
render();
