const genCarbonData = function () {
    return Math.round(Math.random() * 90) + 10
};

let GLOBALCARBON = 419.47;
let dINDEX = 10;

const carbonData = [420.23, 420.99, 418.90, 417.19, 415.95, 415.78, 417.51, 418.95, 418.9, GLOBALCARBON]

const chartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
        {
            label: 'CO2',
            color: 'red',
            borderColor: "red",
            data: carbonData,
            yAxisID: 'y',
            fill: false,
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

const getChartData = () => {
    return {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
            {
                label: 'CO2',
                color: 'red',
                borderColor: "red",
                data: getLastCarbon(),
                yAxisID: 'y',
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
                data: [2, 2.5, 2.8, 1.8, 3, 2.5, 2.8, 1.8, 3, 3.1],
                yAxisID: 'y2',
            },

        ]
    }
}



const getGlobalCarbon = () => {
    return GLOBALCARBON;
}
export default { genCarbonData, chartData, carbonData, getLastCarbon, addCarbon, getChartData, dINDEX, getGlobalCarbon }