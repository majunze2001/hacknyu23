function setup() {
    const cnv = createCanvas(600, 600);
    cnv.parent('p5canvas');


    // setFrameRate
    frameRate(60);
}

const carbon = [100,200,300,400,100]
const X0 = 100, Y0=100;
const frameInterval = 60;

const CarbonStart = [X0, 300];
const xInterval = 20;


function valueToCanvasY(v, height){
    return height-v-Y0;
}

function draw() {
    // background color
    background(128);

    // y axis
    stroke('black');
    strokeWeight(4);
    line(X0, 0, X0, height-Y0);

    // X axis
    stroke('blue');
    strokeWeight(4);
    line(0, height-Y0, width, height-Y0);


    // draw
    stroke('orange');
    strokeWeight(3);
    let prevY = CarbonStart[1];
    let prevX = CarbonStart[0];
    for (let v of carbon){
        line(prevX, prevY, prevX+xInterval, valueToCanvasY(v, height));
        prevX+=xInterval;
        prevY = valueToCanvasY(v, height);
    }



}