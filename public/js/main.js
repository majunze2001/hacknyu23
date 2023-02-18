const socket = io();
const ctx = document.getElementById('myChart');
let chartDemo, index, carbon, capital, power;
let clickCooldown = false;

socket.on('init', ({ chartData, initIndex }) => {
    // try {
    index = initIndex;
    carbon = chartData.datasets[0].data.slice(-1)[0];
    power = chartData.datasets[1].data.slice(-1)[0];
    capital = chartData.datasets[2].data.slice(-1)[0];
    chartDemo = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
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
    // }
    // catch (err) {
    //     console.log(err);
    // }
})

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
        if (clickCooldown) {
            return;
        }
        const choice = e.target.id;
        const change = choice == 'coal' ? 1.2 : -0.2;
        socket.emit('choice', { choice, change });
        const powerGain = choice == 'coal' ? 3 :
            choice == 'wind' ? 2 : 1;

        removeData(chartDemo);
        carbon += change;
        power += powerGain;
        capital -= 1;
        addData(chartDemo, index++, [carbon, power, capital]);
        clickCooldown = true;
        setTimeout(() => clickCooldown = false, 3000)
    })
})