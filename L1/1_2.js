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
        this.angle += alpha * Math.PI / 180;
    }

    penDown() {
        this.drawing = true;
    }

    penUp() {
        this.drawing = false;
    }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxX = canvas.width;
var maxY = canvas.height;

var myTurtle = new Turtle(ctx, maxX/2, maxY/2, 0);

var validCommands = ["forward", "turn", "penDown", "penUp", "setColor", "left", "right"];

function followTheCommand() {
    var command = document.getElementById("myInput").value;
    var warning = document.getElementById("myWarning");
    warning.innerHTML = ""
    if (validCommands.some(used => command.includes(used))) {
        try {
            eval("myTurtle." + command);
        } catch {
            warning.innerHTML = "Niepoprawne polecenie!";
        }
    } else {
        warning.innerHTML = "Niepoprawne polecenie!";
    }
}

button.addEventListener("click", event => {
    followTheCommand();
});

