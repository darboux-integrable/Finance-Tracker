const SESSION_USER_KEY = "session.user.key";

const user = JSON.parse(sessionStorage.getItem(SESSION_USER_KEY));

const userTitle = document.getElementById("landingTitle");

userTitle.innerText += user.firstName + " " + user.lastName;

const incomesButton = document.getElementById("incomesButton");
const expensesButton = document.getElementById("expensesButton");
const balanceButton = document.getElementById("balanceButton");

incomesButton.addEventListener("click", () => location.replace("/users/" + user._id + "/incomes"));
expensesButton.addEventListener("click", () => location.replace("/users/" + user._id + "/expenses"));
balanceButton.addEventListener("click", () => location.replace("/users/" + user._id + "/balances"));

// Brings user back to landing page due to not being signed in yet
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("/");
});

document.getElementById("titleLogoContainer").addEventListener("click", () => {
    location.replace("/");
})