const carbonData = function () {
    return Math.round(Math.random() * 90) + 10
};

const powerData = function () {
    return Math.round(Math.random() * 90) + 100
};

const capitalData = function () {
    return Math.round(Math.random() * 10) + 50
};

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
            data: [2, 2.5, 2.8, 1.8, 3, 2.5, 2.8, 1.8, 3, 3.1],
            yAxisID: 'y2',
        },

    ]
}

const addData = function(label, data){
    chartData.labels.push(label);
    chartData.datasets.forEach((dataset, index) => {
        dataset.data.push(data[index]);
    });
}

// const 

export default { carbonData, powerData, capitalData, chartData, addData }