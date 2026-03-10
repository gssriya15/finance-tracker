let transactions = JSON.parse(localStorage.getItem("transactions")) || []

const list = document.getElementById("list")

function addTransaction(){

let text = document.getElementById("text").value
let amount = document.getElementById("amount").value
let type = document.getElementById("type").value

if(text=="" || amount=="") return

let transaction = {

text:text,
amount:Number(amount),
type:type

}

transactions.push(transaction)

localStorage.setItem("transactions", JSON.stringify(transactions))

update()

}

function deleteTransaction(index){

transactions.splice(index,1)

localStorage.setItem("transactions", JSON.stringify(transactions))

update()

}

function update(){

list.innerHTML=""

let income=0
let expense=0

transactions.forEach((t,index)=>{

let li=document.createElement("li")

li.innerHTML = `
${t.text} ₹${t.amount}

<button class="delete" onclick="deleteTransaction(${index})">X</button>
`

list.appendChild(li)

if(t.type=="income") income+=t.amount
else expense+=t.amount

})

document.getElementById("income").innerText=income
document.getElementById("expense").innerText=expense
document.getElementById("balance").innerText=income-expense

drawChart(income,expense)

}

let chart

function drawChart(income,expense){

let ctx=document.getElementById("chart")

if(chart) chart.destroy()

chart=new Chart(ctx,{

type:'pie',

data:{

labels:['Income','Expense'],

datasets:[{

data:[income,expense]

}]

}

})

}

update()