const socket = io();
const ctx = document.getElementById('myChart');
let chartDemo, index;

socket.on('init', ({ chartData, initIndex }) => {
    try {
        index = initIndex;
        chartDemo = new Chart(ctx, {
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
    }
    catch (err) {
        console.log(err);
    }
})


socket.on('update', data => {
    removeData(chartDemo);
    addData(chartDemo, "time " + index, data);
    index++;
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