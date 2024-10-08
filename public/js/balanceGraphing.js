// Setting Current Bal Display
const SESSION_USER_KEY = "session.user.key";

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    sessionStorage.clear();
    location.replace("/");
});

document.getElementById("titleLogoContainer").addEventListener("click", () => {
    location.replace("/users/"+JSON.parse(sessionStorage.getItem(SESSION_USER_KEY))._id+"/landing");
})

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

const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const toTimeframeBalDisplay = document.getElementById("thisTimeframeBalDisplay");

const thisTimeframeDropdown = document.getElementById("thisTimeframeDropdown");
const thisTimeframeDropdownType = document.getElementById("thisTimeframeDropdownType");

let timeframe = thisTimeframeDropdown.value;
let balType = thisTimeframeDropdownType.value;

thisTimeframeDropdown.addEventListener("input", (e) => {
    timeframe = thisTimeframeDropdown.value;
    toTimeframeBalDisplay.textContent = cleanMoneyForDisplay(addUpMoneyToCurrentDay(balType, timeframe));
});

thisTimeframeDropdownType.addEventListener("input", (e) => {
    balType = thisTimeframeDropdownType.value;
    toTimeframeBalDisplay.textContent = cleanMoneyForDisplay(addUpMoneyToCurrentDay(balType, timeframe));
});

toTimeframeBalDisplay.textContent = cleanMoneyForDisplay(addUpMoneyToCurrentDay(balType, timeframe)); // Initial Set Value

const balDisplay = document.getElementById("currentBalToDisplay");
balDisplay.textContent = cleanMoneyForDisplay(addUpMoneyBetweenDates("both", 0, new Date().getTime())); // Initial Set Value

const certainDatesBalDisplay = document.getElementById("fromThisToThatTimeframeBalDisplay");

const startingDateInput = document.getElementById("startingDate");
const endingDateInput = document.getElementById("endingDate");

const thisToThatTimeframeDropdownType = document.getElementById("thisToThatTimeframeDropdownType");

let startDate = null;
let endDate = null;
let balTypeForThisToThatTime = thisToThatTimeframeDropdownType.value;


thisToThatTimeframeDropdownType.addEventListener("input", (e) => {
    balTypeForThisToThatTime = thisToThatTimeframeDropdownType.value;

    if (balTypeForThisToThatTime === "Incomes & Expenses"){
        balTypeForThisToThatTime = "both";
    }

    if (startDate !== null && endDate !== null) {
        certainDatesBalDisplay.textContent = cleanMoneyForDisplay(addUpMoneyBetweenDates(balTypeForThisToThatTime, startDate.getTime(), endDate.getTime()));
        newDataPoints();
    }
});

startingDateInput.addEventListener("input", (e) => {
    startDate = new Date(startingDateInput.value);

    if (endDate !== null) {
        if (startDate.getTime() > endDate.getTime()) {
            startingDateInput.value = endingDateInput.value;
        }
        certainDatesBalDisplay.textContent = cleanMoneyForDisplay(addUpMoneyBetweenDates(balTypeForThisToThatTime, startDate.getTime(), endDate.getTime()));
        newDataPoints();
    }
});

endingDateInput.addEventListener("input", (e) => {
    endDate = new Date(endingDateInput.value);

    if (startDate !== null) {
        if (endDate.getTime() < startDate.getTime()) {
            endingDateInput.value = startingDateInput.value;
        }
        certainDatesBalDisplay.textContent = cleanMoneyForDisplay(addUpMoneyBetweenDates(balTypeForThisToThatTime, startDate.getTime(), endDate.getTime()));
        newDataPoints();
    }

});

function addUpMoneyToCurrentDay(balType, timeframe) {
    let dayCount = JSON.parse(sessionStorage.getItem(SESSION_USER_KEY));
    let currentDate = new Date();

    // Number of days since start of (not day), week, month, or year
    if (timeframe === "day") {
        dayCount = 1;
    } else if (timeframe === "week") {
        dayCount = currentDate.getDay()+1;
    } else if (timeframe === "month") {
        dayCount = currentDate.getDate();
    } else if (timeframe === "year") {
        let currentMonth = currentDate.getMonth();
        for (let i = 0; i < currentMonth; i++) {
            dayCount += monthDays[months[i].toLowerCase()];
        }
        dayCount += currentDate.getDate();

        // Checks for leap year and if past february
        if (currentDate.getFullYear() % 4 === 0 && currentDate.getMonth() > 1) {
            dayCount++;
        }
    }

    return addUpMoneyBetweenDates(balType, currentDate.getTime() - secToMS(dayCount), currentDate.getTime());
}

function secToMS(num) {
    num = num * (1000 * 60 * 60 * 24)
    return num;
}

function addUpMoneyBetweenDates(incomeType, startDate, endDate) {
    // End date & Start date in MS
    const user = JSON.parse(sessionStorage.getItem(SESSION_USER_KEY));
    let moneySum = 0;

    // Adds all incomes to moneySum
    if(incomeType === "incomes" || incomeType === "both") {
        user.incomes.forEach(income => {
            let newStartDate = startDate;

            if (!(endDate < income.date)) {

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

                if (multiplyNum !== 0) {
                    moneySum += parseFloat(income.amount) * multiplyNum;
                }

            }
        });
    }

    // Adds adds(subtracts) all expenses to moneySum
    if(incomeType === "expenses" || incomeType === "both") {
        user.expenses.forEach(expense => {
            let newStartDate = startDate;

            // Checks if the ending date is less than the expense, skips over if so
            if (!(endDate < expense.date)) {

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
                if(multiplyNum !== 0) {
                    moneySum -= parseFloat(expense.amount) * multiplyNum;
                }

            }
        });
    }

    return parseFloat(moneySum).toFixed(2);
}

// Adds a subtraction sign in front if negative, and a dollar sign, returns a String
function cleanMoneyForDisplay(moneyAmount) {
    let moneyToDisplay = "";
    if (moneyAmount < 0) {
        moneyToDisplay += "-";
    }

    moneyToDisplay += "$ ";
    moneyToDisplay += Math.abs(moneyAmount);

    return moneyToDisplay;
}

// Graph

import Chart from 'https://esm.sh/chart.js/auto';

const ctx = document.getElementById('balOverTimeGraph');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Money Over Time',
                data: [0]
            }
        ]
    },
    options: {
        animation: {
            duration: 500,
            easing: 'easeOutElastic'
        },
        scales: {
            x: {
                ticks: {
                    minRotation: 0,
                    maxRotation: 0
                },
            },
            y: {
                title: {
                    display: true,  // Enable the y-axis title
                    text: 'Current Balance ($)' // Set the label text
                }
            }
        }
    }
});

function newDataPoints() {
    console.log(chart.data.datasets[0].data);
    chart.data.datasets[0].data = [0];
    chart.data.labels = [];
    let dayDif = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    for (let i = 0; i < dayDif; i++){
        chart.data.labels.push("Day "+i);
        chart.data.datasets[0].data.push(addUpMoneyBetweenDates(balTypeForThisToThatTime, startDate.getTime(), startDate.getTime()+((i+1) * (1000 * 60 * 60 * 24))));
        console.log(addUpMoneyBetweenDates(balTypeForThisToThatTime, startDate.getTime(), startDate.getTime()+((i+1) * (1000 * 60 * 60 * 24))));
    }

    chart.update(); // Push updates to chart
}

window.addEventListener('resize', function(){
    chart.resize();
});