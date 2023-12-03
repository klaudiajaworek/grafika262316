class Cross {

    constructor(context, squareIndex, height) {
        this.context = context;
        this.center = centers[squareIndex];
        this.height = height;
    }

    draw() {
        this.context.beginPath();
        this.context.moveTo(this.center.x - this.height, this.center.y + this.height);
        this.context.lineTo(this.center.x + this.height, this.center.y - this.height);
        this.context.moveTo(this.center.x - this.height, this.center.y - this.height);
        this.context.lineTo(this.center.x + this.height, this.center.y + this.height);
        this.context.stroke();
    }
}

class Nought {

    constructor(context, squareIndex, radius) {
        this.context = context;
        this.center = centers[squareIndex];
        this.radius = radius;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)
        this.context.stroke();
    }
}


function drawBoard(context) {
    context.beginPath();

    context.moveTo(startX + squareSize, startY);
    context.lineTo(startX + squareSize, startY + boardSize);

    context.moveTo(startX + 2 * squareSize, startY);
    context.lineTo(startX + 2 * squareSize, startY + boardSize);

    context.moveTo(startX, startY + squareSize);
    context.lineTo(startX + boardSize, startY + squareSize)

    context.moveTo(startX, startY + 2 * squareSize);
    context.lineTo(startX + boardSize, startY + 2 * squareSize)

    context.stroke();
}

function calculateClosestSquare(centers, point) {
    let distances = centers.map(center => (center.x - point.x)**2 + (center.y - point.y)**2);
    return distances.indexOf(Math.min(...distances));
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var height = canvas.height;
var width = canvas.width;

var playersSize = 40;

var boardSize = 0.85 * height;
var startX = (width - boardSize) / 2;
var startY = (height - boardSize) / 2;
var squareSize = boardSize / 3;

var centers = [
    {"x": startX + 0.5 * squareSize, "y": startY + 0.5 * squareSize},
    {"x": startX + 0.5 * squareSize, "y": startY + 1.5 * squareSize},
    {"x": startX + 0.5 * squareSize, "y": startY + 2.5 * squareSize},
    {"x": startX + 1.5 * squareSize, "y": startY + 0.5 * squareSize},
    {"x": startX + 1.5 * squareSize, "y": startY + 1.5 * squareSize},
    {"x": startX + 1.5 * squareSize, "y": startY + 2.5 * squareSize},
    {"x": startX + 2.5 * squareSize, "y": startY + 0.5 * squareSize},
    {"x": startX + 2.5 * squareSize, "y": startY + 1.5 * squareSize},
    {"x": startX + 2.5 * squareSize, "y": startY + 2.5 * squareSize}
];

var winning = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

var noughts = [];
var crosses = [];
var clicked = [];
var index = 0;

function drawPlayer(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var closest = calculateClosestSquare(centers, {"x": x, "y": y});

    if (!(clicked.includes(closest))) {
        if (index % 2 === 0) {
            var nought = new Nought(ctx, closest, playersSize);
            noughts.push(closest);
            nought.draw();
            clicked.push(closest);
            index++;
            for (let winningCombination of winning) {
                if (winningCombination.every(elem => noughts.includes(elem))) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.font = "50px Arial lighter";
                    ctx.fillText("Kółko wygrywa!", canvas.width / 2 - 200, canvas.height / 2);
                }
            }
        } else {
            var cross = new Cross(ctx, closest, playersSize);
            crosses.push(closest);
            cross.draw();
            clicked.push(closest);
            index++;
            for (let winningCombination of winning) {
                if (winningCombination.every(elem => crosses.includes(elem))) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.font = "50px Arial lighter";
                    ctx.fillText("Krzyżyk wygrywa!", canvas.width / 2 - 200, canvas.height / 2);
                }
            }
        }
    }
    if (clicked.length === 9) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "50px Arial lighter";
        ctx.fillText("Remis!", canvas.width / 2 - 100, canvas.height / 2);
    }
}

drawBoard(ctx);

canvas.addEventListener("mousedown", function(event) {
    drawPlayer(canvas, event);
});

