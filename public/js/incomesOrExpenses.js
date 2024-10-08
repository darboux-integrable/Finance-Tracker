const typeInput = document.getElementById("typeInput");
const labelInput = document.getElementById("labelInput");
const amountInput = document.getElementById("amountInput");

const submitButton = document.getElementById("submitButton");
const deleteButton = document.getElementById("deleteButton");

const SESSION_USER_KEY = "session.user.key";

const inputForm = document.getElementById("inputForm");

const clearDataButton = document.getElementById("clearDataButton");

const isIncomesPage = window.location.href.includes("incomes");


// Logging out
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("/");
});

// Going to hub by clicking title
document.getElementById("titleLogoContainer").addEventListener("click", () => {
    location.replace("/users/"+JSON.parse(sessionStorage.getItem(SESSION_USER_KEY))._id+"/landing");
})

inputForm.addEventListener("submit", e => {
    e.preventDefault();

    // Check to make sure all the inputs are entered. 
    if(typeInput.value != "" && labelInput != "" && amountInput != ""){
        const title = labelInput.value;
        const interval = typeInput.value;
        const amount = amountInput.value;

        createTableItem(title, interval, amount);
        addToSessionStorage(title, interval, amount);
    }

})

// Clear the current data for the add new income/expense form.
clearDataButton.addEventListener("click", () => {
    typeInput.value = "Annually";
    labelInput.value = "";
    amountInput.value = "";

})

// Save any changes the user has made. 
window.addEventListener("unload", e => {
    e.preventDefault();
    e.returnValue = "";
    saveSessionStorageToDB();
    alert("working")
})

window.addEventListener("close", e => {
    e.preventDefault();
    saveSessionStorageToDB();
})

window.addEventListener("beforeunload", e => {
    e.preventDefault();
    e.returnValue = "";
    saveSessionStorageToDB();
    alert("not working")
})

const numberOfIncomesOrExpenses = isIncomesPage
  ? JSON.parse(sessionStorage.getItem(SESSION_USER_KEY)).incomes.length
  : JSON.parse(sessionStorage.getItem(SESSION_USER_KEY)).expenses.length;
    

let tableItemID = 0;
const tableBody = document.getElementById("table");

let toggleColor = 1;
function toggleTableBackground(tableItem){

    tableItem.classList.remove("light-table-item");
    tableItem.classList.remove("dark-table-item");

    if(toggleColor++ % 2 == 1)
        tableItem.classList.add("light-table-item");
    else 
        tableItem.classList.add("dark-table-item");

}

function createTableItem(title, payInterval, amount){

    // Create All the elements
    let tableItem = document.createElement("div");
    let itemHead = document.createElement("div");
    let itemTitleContainer = document.createElement("div");
    let itemTitle = document.createElement("h3");
    let deleteButton = document.createElement("button");
    let timeIntervalText = document.createElement("p");
    let amountText = document.createElement("p");

    // Add Classes to the elements 
    tableItem.classList.add("table-item");
    itemHead.classList.add("item-head");
    itemTitleContainer.classList.add("item-title-container");
    itemTitle.classList.add("item-title");
    deleteButton.classList.add("delete-table-item");

    timeIntervalText.classList.add("time-interval-text");
    timeIntervalText.classList.add("item-component");

    amountText.classList.add("amount-text");
    amountText.classList.add("item-component");

    // Add Text to the amount Text, title, and pay interval text
    itemTitle.innerText = title;
    timeIntervalText.innerText = "Pay Interval: " + payInterval;
    amountText.innerText = "Amount: $" + amount;

    // Add an Id to this table item so that it can be identified later
    tableItem.setAttribute("data-id", tableItemID++);

    // Add Text and ID to the delete button
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("id", "deleteItemButton");

    // Add Functionality to the delete button
    deleteButton.addEventListener("click", () => {
        const itemID = tableItem.getAttribute("data-id");
        removeFromSessionStorage(itemID);

        // Have the table element slide out then remove it from the page.
        // Lastly, update all of the light and dark background colors. 
        tableItem.style.animation = "item-slide-out 250ms ease-out forwards"
        setTimeout(function() {
            tableBody.removeChild(tableItem);
            updateBackgroundColors(updateBackgroundColors);
        }, 260)
    })

    // Link all of the elements together;
    itemTitleContainer.appendChild(itemTitle);

    itemHead.appendChild(itemTitleContainer);
    itemHead.appendChild(deleteButton);

    tableItem.appendChild(itemHead);
    tableItem.appendChild(timeIntervalText);
    tableItem.appendChild(amountText);

    tableBody.appendChild(tableItem);

    // Toggle light and dark colors for the new table item;
    toggleTableBackground(itemTitleContainer);
}   

function loadUserData(){
    
    // get the user from session storage. 
    const user = JSON.parse(sessionStorage.getItem(SESSION_USER_KEY));

    // Check if the user is on the incomes or expenses page. 
    // Then load their incomes or expenses.
    if(isIncomesPage){
        user.incomes.forEach(income => {
            createTableItem(income.title, income.interval, income.amount);
        })
    } else {
        user.expenses.forEach(expense => {
            createTableItem(expense.title, expense.interval, expense.amount);
        })
    }

}

function updateBackgroundColors(){
    toggleColor = 1;
    let tableItems = document.querySelectorAll(".item-title-container");

    tableItems.forEach(item => {
        toggleTableBackground(item)
    })
}

function removeFromSessionStorage(id){

    // Get the current user from session storage.
    const user = JSON.parse(sessionStorage.getItem(SESSION_USER_KEY));

    // Check if the user is on the incomes page or expenses page.
    // Then remove the income or expense that goes with the corresponding ID. 
    if(isIncomesPage){
        user.incomes.splice(id, 1);
    } else {
        user.expenses.splice(id, 1);
    }

    // Send the updated user to session storage. 
    sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));

}

function addToSessionStorage(title, interval, amount){

    const newIncomeOrExpense = {
        title: title,
        interval: interval,
        amount: amount,
        date: new Date().getTime()
    }

    // Get the User from Session Storage
    const user = JSON.parse(sessionStorage.getItem(SESSION_USER_KEY));

    // Check if they are on the incomes page. If so, add to their incomes. 
    if(isIncomesPage){
        user.incomes.push(newIncomeOrExpense);
    // If they are not on the incomes page, then they are on the expenses page. So add to their expenses. 
    } else{
        user.expenses.push(newIncomeOrExpense);
    }

    // Save the updated user to session storage. 
    sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));

}

function saveSessionStorageToDB(){
    const user = JSON.parse(sessionStorage.getItem(SESSION_USER_KEY));

    const userID = user._id;

    fetch("/users/" + userID + "/incomes", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
        keepalive: true
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
}

loadUserData();