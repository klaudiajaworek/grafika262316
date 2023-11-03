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

    drawPolygon(n, lineLength, colors = ["#00798c", "#d1495b", "#edae49", "#66a182", "#2e4057", "#581845", "#FF5733"]) {
        var internalAngle = (n-2) * 180 / n;
        this.context.strokeStyle = colors[Math.floor(Math.random()*colors.length)];
        this.context.lineWidth = 2
        for (let i = 0; i <= n; i++) {
            if (i == 0) {
                this.forward(lineLength/2);
                this.turn(180 - internalAngle);
            } else if (i == n) {
                this.forward(lineLength/2);
            } else {
                this.forward(lineLength);
                this.turn(180 - internalAngle);
            }
        }
        this.context.fillStyle = "#efefef";
        this.context.fill();
    }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxX = canvas.width;
var maxY = canvas.height;

const myTurtle = new Turtle(ctx, 0.5 * maxX, 0.9 * maxY);

var maxN = 12;
for (let i = 3; i <= maxN; i++) {
    myTurtle.drawPolygon(i, 0.8 * maxY * Math.sin(Math.PI/maxN));
}
