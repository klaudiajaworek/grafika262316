var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

var IFS = [
    (x, y) => [0.0, 0.16*y],
    (x, y) => [0.2*x - 0.26*y, 0.23*x + 0.22*y + 1.6],
    (x, y) => [-0.15*x + 0.28*y, 0.26*x + 0.24*y + 0.44],
    (x, y) => [0.85*x + 0.04*y, -0.04*x + 0.85*y + 1.6]
]

function barnsleyFern(n) {
    var x = 0;
    var y = 0;
    for (let i = 0; i < n; i++) {
        var func;
        var r = Math.random();
        if (r <= 0.01) {
            func = IFS[0];
        } else if (r <= 0.08) {
            func = IFS[1];
        } else if (r <= 0.15) {
            func = IFS[2];
        } else {
            func = IFS[3];
        }
        [x, y] = func(x, y);
        ctx.fillStyle = "#4C9900";
        ctx.fillRect(width / 2 + x * width / 10, height - (y * height / 11), 1, 1);
    }
}


barnsleyFern(10**5);
