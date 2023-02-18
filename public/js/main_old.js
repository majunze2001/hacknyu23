const ctx = document.getElementById('myChart');

const carbonData = function () {
    return Math.round(Math.random() * 90) + 10
};

const powerData = function () {
    return Math.round(Math.random() * 90) + 100
};

const capitalData = function () {
    return Math.round(Math.random() * 10) + 50
};

// const 

const chartData = {
    labels: ["time 1", "time 2", "time 3", "time 4", "time 5", "time 6", "time 7", "time 8", "time 9", "time 10"],
    datasets: [
        {
            label: 'CO2',
            color: 'red',
            borderColor: "red",
            data: [carbonData(), carbonData(), carbonData(), carbonData(), carbonData(), carbonData(), carbonData(), carbonData(), carbonData(), carbonData()],
            yAxisID: 'y',
        },
        {
            label: 'Power',
            color: 'blue',
            borderColor: "blue",
            data: [powerData(), powerData(), powerData(), powerData(), powerData(), powerData(), powerData(), powerData(), powerData(), powerData()],
            yAxisID: 'y1',
        },

        {
            label: 'Capital',
            color: 'green',
            borderColor: "green",
            data: [capitalData(), capitalData(), capitalData(), capitalData(), capitalData(), capitalData(), capitalData(), capitalData(), capitalData(), capitalData()],
            yAxisID: 'y2',
        },

    ]
}

let index = 11;


const chartDemo = new Chart(ctx, {
    type: 'line',
    data: chartData,

    options: {
        responsive: true,
        barValueSpacing: 2,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis'
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
            y2: {
                type: 'linear',
                display: true,
                position: { x: 1 },
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        }
    }
})

function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset, index) => {
        dataset.data.push(data[index]);
    });
    chart.update();
}

setInterval(function () {
    removeData(chartDemo);
    addData(chartDemo, "time " + index, [carbonData(), powerData(), capitalData()]);
    index++;
}, 1000);