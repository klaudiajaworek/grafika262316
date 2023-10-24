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

    drawPolygon(n, lineLength, colors = ["#581845", "#900c3f", "#c70039", "#ff5733", "#ffc30f"]) {
        var alpha = (n-2) * 180 / n;
        this.angle = (180 - alpha)*Math.PI/180;
        this.context.strokeStyle = colors[Math.floor(Math.random()*colors.length)];
        this.context.lineWidth = 2
        for (let i = 0; i < n; i++) {
            this.forward(lineLength);
            this.turn(180 - alpha);
        }
    }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxX = canvas.width;
var maxY = canvas.height;
const myTurtle = new Turtle(ctx, 0.6 * maxX, 0.9 * maxY);
for (let i = 3; i < 9; i++) {
    myTurtle.drawPolygon(i, 200);
}