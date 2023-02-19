const genCarbonData = function () {
    return Math.round(Math.random() * 90) + 10
};

let GLOBALCARBON = 419.47;
let dINDEX = 10;

let carbonData = [420.23, 420.99, 418.90, 417.19, 415.95, 415.78, 417.51, 418.95, 418.9, GLOBALCARBON]

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
                label: 'Carbon Dioxide',
                backgroundColor: 'red',
                borderColor: "red",
                data: getLastCarbon(),
                yAxisID: 'y',
            },
            {
                label: 'Productivity on Power',
                backgroundColor: 'blue',
                borderColor: "blue",
                data: [2.5, 2.8, 1.8, 3, 3.1, 2, 2.5, 2.8, 1.8, 3],
                yAxisID: 'y1',
            },
            {
                label: 'Budget for Power',
                backgroundColor: "green",
                borderColor: "green",
                data: [2, 2.5, 2.8, 1.8, 3, 2.5, 2.8, 1.8, 3, 3.1],
                yAxisID: 'y2',
            },

        ]
    }
}

const reset = () => {
    carbonData = carbonData.slice(0, 10);
    GLOBALCARBON = carbonData.slice(-1)[0];
}



const getGlobalCarbon = () => {
    return GLOBALCARBON;
}
export default { genCarbonData, carbonData, getLastCarbon, addCarbon, getChartData, dINDEX, getGlobalCarbon, reset }