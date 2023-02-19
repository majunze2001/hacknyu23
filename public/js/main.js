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
            maintainAspectRatio: false,
            barValueSpacing: 1,
            plugins: {
                title: {
                    display: true,
                    color: 'green',
                    text: 'Your Energy, Pollution, and Cash Chart',
                    font: {
                        size: 22
                    }
                },
                legend: {
                    labels: {
                        color: 'black',
                        // This more specific font property overrides the global property
                        font: {
                            size: 18
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'black',
                        lineWidth: 1
                    },
                    border: {
                        color: 'black',
                        width: 5
                    },
                    ticks: {
                        color: 'black',
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: 'red',
                        stepSize: 0.5,
                        maxTicksLimit: 8,
                        callback: value => `${value} ppm`,
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'black',
                    },

                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        color: 'blue',
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    ticks: {
                        color: 'blue',
                        stepSize: 1,
                        maxTicksLimit: 8,
                        font: {
                            size: 16
                        }
                    },
                },
                y2: {
                    type: 'linear',
                    display: true,
                    position: { x: 1 },
                    grid: {
                        lineWidth: 1,
                        color: 'green',
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    ticks: {
                        color: 'green',
                        stepSize: 1,
                        maxTicksLimit: 8,
                        font: {
                            size: 16
                        }
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
    // console.log(newData);

    chartDemo.data.datasets.forEach((dataset) => {
        dataset.data.shift();
        if (dataset.label == 'Carbon Dioxide') {
            dataset.data = newData;
            carbon = newData.slice(-1)[0];
        } else if (dataset.label == 'Budget for Power') {
            const capitalChange = carbonFactor * (Math.log10(power));
            console.log(capitalChange);
            capital += capitalChange;
            dataset.data.push(capital);
        } else {
            power -= 0.3;
            dataset.data.push(power);
        }
    });

    chartDemo.update();

    testGameOver();

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
        const change = choice == 'coal' ? 3 : -0.3;
        socket.emit('choice', { choice, change });
        const powerGain = choice == 'coal' ? 3 :
            choice == 'wind' ? 2 : 1;

        removeData(chartDemo);
        carbon += change;
        power += powerGain;
        capital -= 0.5;
        addData(chartDemo, index++, [carbon, power, capital]);
        clickCooldown = true;
        setTimeout(() => clickCooldown = false, 3000);
        testGameOver();
    })
})



function testGameOver() {
    if (capital <= 0) {
        socket.off('carbon');
        alert("Game over");
    }
}