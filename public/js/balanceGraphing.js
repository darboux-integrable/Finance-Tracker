// Setting Current Bal Display
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("/");
});

const balDisplay = document.getElementById("currentBalToDisplay");

const SESSION_USER_KEY = "session.user.key";

const dropdownTypeToDay = {
    onetime: 0,
    daily: 1,
    weekly: 7,
    biweekly: 14,
    monthly: 31,
    quarterly: 90,
    biannually: 180,
    annually: 365
};

const monthDays = {
    january: 31,
    february: 28,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31
};


const currentDate = new Date();
let currentMonth = currentDate.getMonth();
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];


const daysSinceMonthStart = {
    day: 0,
    month: monthDays[months[currentMonth]],
    year: 365
}



/*
const toTimeframeBalDisplay = document.getElementById("thisTimeframeBalDisplay");

const thisTimeframeDropdown = document.getElementById("thisTimeframeDropdown");
const thisTimeframeDropdownType = document.getElementById("thisTimeframeDropdownType");

let timeframe = thisTimeframeDropdown.value;
let balType = thisTimeframeDropdownType.value;

thisTimeframeDropdown.addEventListener("input", (e) => {
    timeframe = thisTimeframeDropdown.value;


    toTimeframeBalDisplay.textContent = addUpMoneyBetweenDates(balType, new Date.now().

});

thisTimeframeDropdownType.addEventListener("input", (e) => {
    balType = thisTimeframeDropdownType.value;


});*/

function addUpMoneyBetweenDates(incomeType, startDate, endDate) {
    // End date & Start date in MS
    const user = JSON.parse(sessionStorage.getItem(SESSION_USER_KEY));
    let moneySum = 0;

    // Adds all incomes to moneySum
    if(incomeType === "incomes" || incomeType === "both") {
        user.incomes.forEach(income => {
            let newStartDate = startDate;
            if (newStartDate < income.date) {
                newStartDate = income.date;
            }

            let dayDifference = Math.floor((endDate - newStartDate) / (1000 * 60 * 60 * 24));
            let dayInterval = dropdownTypeToDay[income.interval.toLowerCase()];

            // Checks if type is onetime and should only multiple once, (if dayInterval == false)
            let multiplyNum = 1;
            if (dayInterval > 0) {
                multiplyNum = Math.floor(dayDifference / dayInterval);
            }

            if(multiplyNum != 0) {
                moneySum += parseInt(income.amount) * multiplyNum;
            }
        });
    }

    // Adds adds(subtracts) all expenses to moneySum
    if(incomeType === "expenses" || incomeType === "both") {
        user.expenses.forEach(expense => {
            let newStartDate = startDate;
            if (newStartDate < expense.date) {
                newStartDate = expense.date;
            }

            let dayDifference = Math.floor((endDate - newStartDate) / (1000 * 60 * 60 * 24));
            let dayInterval = dropdownTypeToDay[expense.interval.toLowerCase()];

            // Checks if type is onetime and should only multiple once, (if dayInterval == false)
            let multiplyNum = 1;
            if (dayInterval > 0) {
                multiplyNum = Math.floor(dayDifference / dayInterval);
            }
            if(multiplyNum != 0) {
                moneySum -= parseInt(expense.amount) * multiplyNum;
            }
        });
    }

    return moneySum;
}