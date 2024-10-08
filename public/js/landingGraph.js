import Chart from 'https://esm.sh/chart.js/auto';

const ctx = document.getElementById('openingGraph');

const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [months[currentMonth]+" "+currentYear],
        datasets: [
            {
                label: 'Account 1',
                data: [0]
            },
            {
                label: 'Account 2',
                data: [0]
            },
            {
                label: 'Account 3',
                data: [0]
            }
        ]
    },
    options: {
        animation: {
            duration: 500,
            easing: 'easeOutElastic'
        },
        scales: { // Disables axes
            x: {
                ticks: {
                    minRotation: 0,
                    maxRotation: 0
                },
            },
            y: {
                min: 0,
                max: 100,
                title: {
                    display: true,  // Enable the y-axis title
                    text: 'Current Balance ($)' // Set the label text
                }
            }
        }
    }
});

for(let i = 0; i < 5; i++){
    newDataPoints();
}

function newDataPoints() {
    currentMonth++;
    if(currentMonth === 12){ // If now Dec. -> increment year / reset to Jan.
        currentYear++;
        currentMonth = 0;
    }
    chart.data.labels.push(months[currentMonth]+" "+currentYear); // Next X-axis label
    chart.data.datasets.forEach((dataset) => {
        if(chart.data.labels.length > 6){
            dataset.data.shift();
        }

        dataset.data.push(dataset.data[dataset.data.length-1]+(Math.floor(Math.random() * 50)-25)); // Random datapoint for each line

        if(dataset.data[dataset.data.length-1] > 100) {
            dataset.data[dataset.data.length-1] = 100;
        }
        if(dataset.data[dataset.data.length-1] < 0) {
            dataset.data[dataset.data.length-1] = 0;
        }
        //console.log(dataset.data[dataset.data.length-1]);
    });

    if(chart.data.labels.length > 6){
        chart.data.labels.shift();
    }

    chart.update(); // Push updates to chart
}

// Add new data points every 1.75 seconds
setInterval(newDataPoints, 1750);

window.addEventListener('resize', function(){
    chart.resize();
});