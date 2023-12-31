function drawElipseNaive(context, x0, y0, a, b, step) {
    var x = x0 - a;
    var y = y0;
    context.fillRect(x, y, 1, 1);
    while (x < x0 + a) {
        x += step;
        var dy = b * Math.sqrt(1 - ((x - x0) / a)**2)
        context.fillRect(x, y0 + dy, 1, 1);
        context.fillRect(x, y0 - dy, 1, 1);
    }
}

function drawElipseBresenham(context, x0, y0, a, b) {
    var x = 0;
    var y = b;

    var d = b**2 + a**2 * (-b + 1/4);
    var dx = 2 * b**2 * x;
    var dy = 2 * a**2 * y;

    while (dx < dy) {

        context.fillRect(x0 + x, y0 + y, 1, 1);
        context.fillRect(x0 - x, y0 + y, 1, 1);
        context.fillRect(x0 + x, y0 - y, 1, 1);
        context.fillRect(x0 - x, y0 - y, 1, 1);

        if (d <= 0) {
            x += 1;
            dx = 2 * b**2 * x;
            d += dx + b**2;
        } else {
            x += 1;
            y -= 1;
            dx = 2 * b**2 * x;
            dy = 2 * a**2 * y;
            d += dx - dy + b**2;
        }
    }

    d += b**2 * (-x - 3/4) + a**2 * (-y + 3/4);

    while (y >= 0) {

        context.fillRect(x0 + x, y0 + y, 1, 1);
        context.fillRect(x0 - x, y0 + y, 1, 1);
        context.fillRect(x0 + x, y0 - y, 1, 1);
        context.fillRect(x0 - x, y0 - y, 1, 1);

        if (d <= 0) {
            x += 1;
            y -= 1;
            dx = 2 * b**2 * x;
            dy = 2 * a**2 * y;
            d += dx - dy + a**2;
        } else {
            y -= 1;
            dy = 2 * a**2 * y;
            d += - dy + a**2;
        }
    }
}


var naiveCanvas = document.getElementById("naiveCanvas");
var bresenhamCanvas = document.getElementById("bresenhamCanvas");

var naiveCtx = naiveCanvas.getContext("2d");
var bresenhamCtx = bresenhamCanvas.getContext("2d");

var startTime = performance.now();
drawElipseNaive(naiveCtx, naiveCanvas.width / 2, naiveCanvas.height / 2, 200, 150, 0.01);
var endTime = performance.now();

naiveCtx.font = "15px Arial";
naiveCtx.fillText(`Algorytm naiwny: ${endTime - startTime} ms`, 20, 20);

startTime = performance.now();
drawElipseBresenham(bresenhamCtx, bresenhamCanvas.width / 2, bresenhamCanvas.height / 2, 200, 150);
endTime = performance.now();

bresenhamCtx.font = "15px Arial";
bresenhamCtx.fillText(`Algorytm Bresenhama: ${endTime - startTime} ms`, 20, 20);


