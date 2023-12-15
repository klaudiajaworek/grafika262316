var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

function numToHex(num) {
    var hex = num.toString(16);
    if (hex.length === 1) {
        return "0" + hex;
    }
    return hex;

}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => numToHex(x)).join("")
}

function drawJuliaSet(xMin, xMax, yMin, yMax, c) {
    var [cReal, cImag] = c;
    var w = xMax - xMin;
    var h = yMax - yMin;
    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            var zReal = 2 * (x - xMin - w / 2) / w;
            var zImag = 2 * (y - yMin - h / 2) / h;
            for (var i = 0; i < 255; i++) {
                var oldReal = zReal;
                var oldImag = zImag;
                zReal = oldReal**2 - oldImag**2 + cReal;
                zImag = 2 * oldReal * oldImag + cImag;
                if ((zReal**2 + zImag**2) > 4) {
                    break;
                }
            }
            ctx.fillStyle = rgbToHex(i, 0, i);
            ctx.fillRect(x, y, 1, 1); 
        }
    }
}

drawJuliaSet(0, width, 0, height, [-0.15, 0.65])
