const monthlyIncome =document.getElementById("monthlyIncome");
const monthlyExpense =document.getElementById("monthlyExpense");
const monthlyBalance =document.getElementById("monthlyBalance");
const reportList =document.getElementById("reportList");
let transactions =JSON.parse(localStorage.getItem("transactions")) || [];
let currentMonth =new Date().getMonth();
let income = 0;
let expense = 0;
transactions.forEach(item => {
    let itemMonth = new Date(item.date).getMonth();
    if(itemMonth === currentMonth){
        if(item.type === "income"){
            income += item.amount;
        }else{
            expense += item.amount;
        }
        reportList.innerHTML += `
        <tr>
            <td>${item.title}</td>
            <td>${item.amount} Ks</td>
            <td>
                <span class="
                badge
                ${item.type === "income"
                ? "bg-success"
                : "bg-danger"}">
                ${item.type}
                </span>
            </td>
            <td>${item.date}</td>
        </tr>
        `;
    }
});
monthlyIncome.innerText = income + " Ks";
monthlyExpense.innerText = expense + " Ks";
monthlyBalance.innerText = (income - expense) + " Ks";