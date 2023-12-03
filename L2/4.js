function drawBoard(context) {
    var linesX = [];
    var linesY = [];

    for (let i = 0; i < 6; i++) {
        linesX.push(i * squareWidth);
    }

    for (let i = 0; i < 5; i++) {
        linesY.push(i * squareHeight);
    }

    context.beginPath();
    for (let lineX of linesX) {
        context.moveTo(lineX, 0);
        context.lineTo(lineX, height);
    }

    for (let lineY of linesY) {
        context.moveTo(0, lineY);
        context.lineTo(width, lineY);
    }

    context.stroke();

}

function createCenters() {
    var centers = [];
    var numbers = [...Array(10).keys()].concat([...Array(10).keys()]);

    for (let i = 0; i < 20; i++) {
        var chosenNumber = numbers[Math.floor(numbers.length * Math.random())];
        numbers.splice(numbers.indexOf(chosenNumber), 1);
        centers.push({"index": i, "x": squareWidth * (0.5 + i % 5), "y": squareHeight * (0.5 + Math.floor(i/5)), "number": chosenNumber})
    }
    return centers;
}

function calculateClosestSquare(centers, point) {
    let distances = centers.map(center => (center.x - point.x)**2 + (center.y - point.y)**2);
    return centers[distances.indexOf(Math.min(...distances))];
}


var canvas = document.getElementById("myCanvas");

var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var squareWidth = width / 5;
var squareHeight = height / 4;

var centers = createCenters();

var clicked = [];
var uncovered = [];
var step = 0;

var correctCombinations = [];

var numbers = [...Array(10).keys()];
for (let number of numbers) {
    var indexes = centers.filter(x => x.number === number).map(x => x.index);
    correctCombinations.push(indexes);
}


function addToUncovered() {
    for (let combination of correctCombinations) {
        if (combination.every(x => clicked.includes(x))) {
            uncovered.push(...combination);
        }
    }
}

function draw(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var closest = calculateClosestSquare(centers, {"x": x, "y": y});

    if (!(clicked.includes(closest.index) || uncovered.includes(closest.index))) {
        if (step === 2) {
            step = 0;
            for (let clickedSquare of clicked) {
                if (!(uncovered.includes(clickedSquare))) {
                    var chosenCenter = centers.filter(x => x.index === clickedSquare)[0];
                    ctx.clearRect(chosenCenter.x - 65, chosenCenter.y - 65, 130, 130);
                }
            }
            clicked = [];
        }
        step++;
        var img = new Image();
        img.src = `img/${closest.number}.avif`;
        ctx.drawImage(img, closest.x - 65, closest.y - 65, 130, 130);
        clicked.push(closest.index);
        addToUncovered();
    }
}

drawBoard(ctx);

for (let i = 0; i < 20; i++) {
    var img = new Image();
    img.src = `img/${i}.avif`;
    ctx.drawImage(img, 15, 10, 130, 130);
}

ctx.clearRect(15, 10, 130, 130);

canvas.addEventListener("mousedown", function(event) {
    draw(canvas, event);
});



