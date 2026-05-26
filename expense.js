const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const balance = document.getElementById("balance");
const todayDate = document.getElementById("todayDate");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;

/* Current Date */
todayDate.innerText = new Date().toDateString();

showTransactions();

/* Add */
addBtn.addEventListener("click", () => {
    if (
        title.value === "" ||
        amount.value === ""
    ) {
        alert("Please fill all fields");
        return;
    }
    if (editId) {
        transactions = transactions.map(item =>
            item.id === editId
                ? {
                    ...item,
                    title: title.value,
                    amount: Number(amount.value),
                    type: type.value
                }
                : item
        );
        editId = null;
        addBtn.innerText = "Add";
    } else {
        const transaction = {
            id: Date.now(),
            title: title.value,
            amount: Number(amount.value),
            type: type.value,
            date: new Date().toLocaleDateString()
        };
        transactions.push(transaction);
    }
    saveData();
    showTransactions();
    title.value = "";
    amount.value = "";
});
/* Show Transactions */
function showTransactions() {
    list.innerHTML = "";
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.reverse().forEach(item => {
        if (item.type === "income") {
            totalIncome += item.amount;
        } else {
            totalExpense += item.amount;
        }
        list.innerHTML += `
        <div class="transaction ${item.type}">
           <div class="transaction-info">

    <h5>${item.title}</h5>

    <div class="middle-info">
        <span class="amount-text">
            ${item.amount} Ks
        </span>

        <span class="date-text">
            ${item.date}
        </span>
    </div>

</div>
            <div class="action-btns">
                <button
                    class="edit-btn"
                    onclick="editTransaction(${item.id})">
                    Update
                </button>
                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${item.id})">
                    Delete
                </button>
            </div>
        </div>
        `;
    });
    income.innerText = totalIncome + " Ks";
    expense.innerText = totalExpense + " Ks";
    balance.innerText = (totalIncome - totalExpense) + " Ks";
}
/* Delete */
function deleteTransaction(id) {
    transactions =
        transactions.filter(item => item.id !== id);
    saveData();
    showTransactions();
}
/* Edit */
function editTransaction(id) {
    let item =
        transactions.find(item => item.id === id);
    title.value = item.title;
    amount.value = item.amount;
    type.value = item.type;
    editId = id;
    addBtn.innerText = "Update";
}
/* Save */
function saveData() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}