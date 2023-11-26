
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

    generateLSystemString(n, V, C, S, R) {
        var start = S;
        for (let i = 0; i < n; i++) {
            var end = "";
            for (let x of start) {
                if (x in R) {
                    end += R[x];
                } else {
                    end += x;
                }
            }
            start = end;
        }
        return start;
    }

    drawLSystem(n, V, C, S, R, step) {
        this.x = 0.1 * maxX;
        this.y = 0.5 * maxY;
        this.penDown();
        this.context.clearRect(0, 0, maxX, maxY);
        var LSystem = this.generateLSystemString(n, V, C, S, R);

        for (let letter of LSystem) {
            if (letter === "A") {
                this.penDown();
                this.forward(step);
            } else if (letter === "B") {
                this.penUp();
                this.forward(step);
            } else if (letter === "F") {
                this.forward(step);
            } else if (letter === "+") {
                this.turn(60);
            } else if (letter === "-") {
                this.turn(-60);
            } 
        }
    }
}


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxX = canvas.width;
var maxY = canvas.height;

var myTurtle = new Turtle(ctx, 0, 0);

function fib(n) {
    if (n <= 2) return 1;
    return fib(n-1) + fib(n-2);
  }

function algaeGrowth() {
    var n = parseInt(document.getElementById("iterationsNumber").value);
    myTurtle.drawLSystem(n, ["A", "B"], [], "A", {"A": "AB", "B": "A"}, 0.8 * maxX / fib(n+2));
}

function kochCurve() {
    var n = parseInt(document.getElementById("iterationsNumber").value);
    myTurtle.drawLSystem(n, ["F"], ["+", "-"], "F", {"F": "F-F++F-F"}, 0.8 * maxX / 3**n);
}

function cantorSet() {
    var n = parseInt(document.getElementById("iterationsNumber").value);
    myTurtle.drawLSystem(n, ["A", "B"], [], "A", {"A": "ABA", "B": "BBB"}, 0.8 * maxX / 3**n);
}
