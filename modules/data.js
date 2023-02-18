const genCarbonData = function () {
    return Math.round(Math.random() * 90) + 10
};

// const genPowerData = function () {
//     return Math.round(Math.random() * 90) + 100
// };

// const genCapitalData = function () {
//     return Math.round(Math.random() * 10) + 50
// };

const initCarbon = 5;
const initPower = 5;
const initCapital = 5;
let GLOBALCARBON = genCarbonData();
let dINDEX = 10;

const carbonData = [genCarbonData(), genCarbonData(), genCarbonData(), genCarbonData(), genCarbonData(), genCarbonData(), genCarbonData(), genCarbonData(), genCarbonData(), GLOBALCARBON]

const chartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
        {
            label: 'CO2',
            color: 'red',
            borderColor: "red",
            data: carbonData,
            yAxisID: 'y',
            fill:false,
        },
        {
            label: 'Power',
            color: 'blue',
            borderColor: "blue",
            data: [2.5, 2.8, 1.8, 3, 3.1, 2, 2.5, 2.8, 1.8, 3],
            yAxisID: 'y1',
        },
        {
            label: 'Capital',
            color: 'green',
            borderColor: "green",
            data: [20, 50, 30, 70, 90, 65, 54, 38, 49, 60],
            yAxisID: 'y2',
        },

    ]
}

const getLastCarbon = function () {

    return carbonData.slice(-10);
    // return { carbonData: [carbonData.slice(-10)], dINDEX };
}
const addCarbon = (data) => {
    GLOBALCARBON += data
    carbonData.push(GLOBALCARBON);
    dINDEX++;
    return { carbonData, dINDEX }
}

// const addData = function (label, data) {
//     chartData.labels.push(label);
//     chartData.datasets.forEach((dataset, index) => {
//         dataset.data.push(data[index]);
//     });
// }

// const 
export default { genCarbonData, chartData, carbonData, getLastCarbon, addCarbon }