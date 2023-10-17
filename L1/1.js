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

    left(angle) {
        this.angle += angle;
    }

    right(angle) {
        this.angle -= angle;
    }

    startDrawing() {
        this.drawing = true;
    }

    stopDrawing() {
        this.drawing = false;
    }

    drawPolygon(n, lineLength) {
        var alpha = (n-2) * Math.PI / n;
        this.angle = (Math.PI - alpha)/2;
        for (let i = 0; i < n; i++) {
            this.forward(lineLength);
            this.left(Math.PI - alpha);
        }
    }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxX = canvas.width;
var maxY = canvas.height;
const myTurtle = new Turtle(ctx, maxX/2, 0.9 * maxY);
for (let i = 3; i < 9; i++) {
    myTurtle.drawPolygon(i, 200);
}