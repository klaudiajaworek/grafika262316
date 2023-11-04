class Turtle {

    constructor(context, x, y, angle = 0) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.drawing = true;
        this.vertices = [];
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

    drawPolygon(n, lineLength) {
        var internalAngle = (n-2) * 180 / n;
        for (let i = 0; i <= n; i++) {
            if (i == 0) {
                this.forward(lineLength/2);
                this.turn(180 - internalAngle);
                this.vertices.push({x: this.x, y: this.y});
            } else if (i == n) {
                this.forward(lineLength/2);
            } else {
                this.forward(lineLength);
                this.turn(180 - internalAngle);
                this.vertices.push({x: this.x, y: this.y});
            }
        }
    }

    drawGraph(n, color) {
        this.x = maxX/2;
        this.y = 0.9 * maxY;
        this.angle = 0;
        this.context.strokeStyle = color;
        this.context.lineWidth = 2;
        this.drawPolygon(n, 0.8 * maxY * Math.sin(Math.PI/n));
        for (let point of this.vertices) {
            let others = this.vertices.filter(x => x != point);
            for (let other of others) {
                this.context.beginPath();
                this.context.moveTo(point.x, point.y);
                this.context.lineTo(other.x, other.y);
                this.context.stroke();
            }
        }
        this.vertices = [];
    }

    drawBipartiteGraph(n, m, color) {
        var upperSet = [];
        var lowerSet = [];
        this.context.strokeStyle = color;
        this.context.lineWidth = 2;
        for (let i = 0; i < n; i++) {
            upperSet.push({x: (i+1)/(n+1) * maxX, y: 0.2 * maxY});
        }
        for (let i = 0; i < m; i++) {
            lowerSet.push({x: (i+1)/(m+1) * maxX, y: 0.8 * maxY});
        }
        for (let upperVertex of upperSet) {
            for (let lowerVertex of lowerSet) {
                this.context.beginPath();
                this.context.moveTo(upperVertex.x, upperVertex.y);
                this.context.lineTo(lowerVertex.x, lowerVertex.y);
                this.context.stroke();
            }
        }
        this.vertices = [];
    }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxX = canvas.width;
var maxY = canvas.height;

var colors = ["#00798c", "#d1495b", "#edae49", "#66a182", "#2e4057", "#581845", "#FF5733"];

var myTurtle = new Turtle(ctx, maxX/2, maxY/2, 0);

function graph() {
    var verticesNumber = document.getElementById("graphInput");
    ctx.clearRect(0, 0, maxX, maxY);
    myTurtle.drawGraph(parseInt(verticesNumber.value), colors[Math.floor(Math.random() * colors.length)]);
}

function bipartiteGraph() {
    var verticesNumber = document.getElementById("graphInput");
    var verticesNumber2 = document.getElementById("bipartiteGraphInput");
    ctx.clearRect(0, 0, maxX, maxY);
    myTurtle.drawBipartiteGraph(parseInt(verticesNumber.value), parseInt(verticesNumber2.value), colors[Math.floor(Math.random() * colors.length)]);
}


