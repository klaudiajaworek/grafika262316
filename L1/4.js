class Turtle {
    constructor(context, x, y, angle = 0) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.drawing = true;
    }

    forward(distance) {
        var x0 = this.x,
            y0 = this.y;
        this.x += distance * Math.cos(this.angle);
        this.y -= distance * Math.sin(this.angle);
        if (this.drawing) {
            this.context.beginPath();
            this.context.moveTo(x0, y0);
            this.context.lineTo(this.x, this.y);
            this.context.stroke();
        } else {
            this.context.moveTo(this.x, this.y);
        }
    }

    turn(alpha) {
        this.angle += alpha * Math.PI / 180
    }

    penDown() {
        this.drawing = true;
    }

    penUp() {
        this.drawing = false;
    }

    drawSierpinskiTriangle(sideLength, n) {
        if (n == 0) {
            for (let i = 0; i < 3; i++) {
                this.forward(sideLength);
                this.turn(120);
            }
        } else {
            for (let i = 0; i < 3; i++) {
                this.drawSierpinskiTriangle(sideLength/2, n-1);
                this.forward(sideLength/2);
                this.drawSierpinskiTriangle(sideLength/2, n-1);
                this.forward(-sideLength/2);
                this.turn(60);
                this.forward(sideLength/2);
                this.turn(-60);
                this.drawSierpinskiTriangle(sideLength/2, n-1);
                this.turn(60);
                this.forward(-sideLength/2);
                this.turn(-60);
            }
        }
    }

    drawKochCurve(lineLength, n) {
        if (n == 0) {
            this.forward(lineLength);
        } else {
            lineLength /= 3;
            this.drawKochCurve(lineLength, n-1);
            this.turn(60);
            this.drawKochCurve(lineLength, n-1);
            this.turn(-120);
            this.drawKochCurve(lineLength, n-1);
            this.turn(60);
            this.drawKochCurve(lineLength, n-1);
        }
    }

    drawKochSnowflake(sideLength, n) {
        for (let i = 0; i < 3; i++) {
            this.drawKochCurve(sideLength, n);
            this.turn(-120);
        }
    }
}


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxX = canvas.width;
var maxY = canvas.height;

let colors = ["#00798c", "#d1495b", "#edae49", "#66a182", "#2e4057", "#581845", "#FF5733"];

function kochSnowflake() {
    var turtle = new Turtle(ctx, maxX/4, maxY/3.5, 0);
    var input = document.getElementById("iterationsNumber");
    ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, maxX, maxY);
    turtle.drawKochSnowflake(maxX/2, input.value);
}

var sideLength = 8/(5 * Math.sqrt(3)) * maxY;
function sierpinskiTriangle() {
    var turtle = new Turtle(ctx, (maxX - sideLength) / 2, 0.9 * maxY, 0);
    var input = document.getElementById("iterationsNumber");
    ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, maxX, maxY);
    turtle.drawSierpinskiTriangle(sideLength, input.value);
}
