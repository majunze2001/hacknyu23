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
                // title: {
                //     display: true,
                //     text: ''
                // },
                responsive: true,
                barValueSpacing: 2,
                plugins: {
                    title: {
                        display: true,
                        text: 'Line Chart - Multi Axis'
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            stepSize: 1
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                        ticks: {
                            stepSize: 1
                        },
                    },
                    y2: {
                        type: 'linear',
                        display: true,
                        position: { x: 1 },
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                        ticks: {
                            stepSize: 1
                        }
                    },
                }
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})


// socket.on('update', data => {
//     removeData(chartDemo);
//     addData(chartDemo, "time " + index, data);
//     index++;
// })

// only updates carbon
socket.on('carbon', newData => {
    index++;
    // only updates carbon
    chartDemo.data.labels.shift();
    chartDemo.data.labels.push(index);

    chartDemo.data.datasets.forEach((dataset) => {
        dataset.data.shift();
        if (dataset.label == 'CO2') {
            dataset.data = newData;
            console.log(dataset.data);
        } else {
            dataset.data.push(dataset.data[dataset.data.length - 1]);
        }
    });

    chartDemo.update()

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

document.querySelectorAll('.choices').forEach(ele => {
    ele.addEventListener('click', function (e) {
        const choice = e.target.id;
        socket.emit('choice', choice);
    })
})