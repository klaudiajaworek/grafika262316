class Turtle3D {

    constructor(context, x, y, z, angle1, angle2) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.z = z;
        this.angle1 = angle1;
        this.angle2 = angle2;
        this.drawing = true;
    }

    forward(distance) {
        var x0 = this.x,
            y0 = this.y;
        this.x += distance * Math.cos(this.angle2) * Math.cos(this.angle1);
        this.y -= distance * Math.cos(this.angle2) * Math.sin(this.angle1);
        this.z += distance * Math.sin(this.angle2);
        if (this.drawing) {
            this.context.beginPath();
            this.context.moveTo(x0, y0);
            this.context.lineTo(this.x, this.y);
            this.context.stroke();
        } else {
            this.context.moveTo(this.x, this.y);
        }
    }

    turnXY(alpha) {
        this.angle1 += alpha * Math.PI / 180.0;
    }

    turnZ(alpha) {
        this.angle2 += alpha * Math.PI / 180.0;
    }


    penUp() {
        this.drawing = false;
    }

    penDown() {
        this.drawing = true;
    }
}


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxX = canvas.width;
var maxY = canvas.height;

var turtle = new Turtle3D(ctx, maxX/2, maxY/2, 0, 0, 0);

var validCommands = ["forward", "turnXY", "turnZ", "penDown", "penUp"];

function followTheCommand() {
    var command = document.getElementById("myInput").value;
    var warning = document.getElementById("myWarning");
    warning.innerHTML = ""
    if (validCommands.some(x => command.includes(x))) {
        try {
            eval("turtle." + command);
        } catch {
            warning.innerHTML = "Niepoprawne polecenie!";
        }
    } else {
        warning.innerHTML = "Niepoprawne polecenie!";
    }
}

