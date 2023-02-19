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
            // title: {
            //     display: true,
            //     text: ''
            // },
            responsive: true,
            maintainAspectRatio: false,
            barValueSpacing: 2,
            borderWidth:5,

            plugins: {
                title: {
                    display: true,
                    text: 'Your Energy, Pollution, and Cash Chart'
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
    // }
    // catch (err) {
    //     console.log(err);
    // }
})

// only updates carbon
socket.on('carbon', ({ newData, carbonFactor }) => {
    index++;
    // only updates carbon
    chartDemo.data.labels.shift();
    chartDemo.data.labels.push(index);

    chartDemo.data.datasets.forEach((dataset) => {
        dataset.data.shift();
        if (dataset.label == 'CO2') {
            dataset.data = newData;
            // console.log(dataset.data);
        } else if (dataset.label == 'Capital') {
            capital *= carbonFactor * Math.log10(power);
            dataset.data.push(capital);
        } else {
            power -= 0.3;
            dataset.data.push(power);
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