var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxX = canvas.width;
var maxY = canvas.height;

var obstacles = [];
var player = {x: 0.5 * maxX, y: 0.9 * maxY, width: 20, height: 20};
var target = {x: 0.5 * maxX, y: 0.05 * maxY, width: 200, height: 30};

function drawTarget() {
    ctx.strokeStyle = "#2e4057";
    ctx.strokeRect(target.x - target.width/2, target.y - target.height/2, target.width, target.height);
}

function drawPlayer() {
    ctx.strokeStyle = "#00798c";
    ctx.strokeRect(player.x - player.width/2, player.y - player.width/2, player.width, player.height);
}

function addObstacles() {
    var width = 60;
    var height = 15;
    for (let i = 0; i < 30; i++) {
        obstacles.push(
            {
                x: Math.floor(Math.random() * (maxX - width) + width/2), 
                y: Math.floor(Math.random() * (player.y - player.height/2 - target.y - target.height/2 - height) + target.y + target.height/2 + height/2),
                width: width,
                height: height
            }
        );
    }
}

function drawObstacles() {
    ctx.strokeStyle = "#ff5733";
    for (let obstacle of obstacles) {
        ctx.strokeRect(obstacle.x - obstacle.width/2, obstacle.y - obstacle.height/2, obstacle.width, obstacle.height)
    }
}

function checkCollision(object1, object2) {
    return (Math.abs(object1.x - object2.x) <= (object1.width + object2.width)/2 && 
            Math.abs(object1.y - object2.y) <= (object1.height + object2.height)/2);
}

function setUp() {
    addObstacles();
}

function update() {
    ctx.clearRect(0, 0, maxX, maxY);
    drawObstacles();
    drawTarget();
    drawPlayer();
    if (checkCollision(player, target)) {
        ctx.clearRect(0, 0, maxX, maxY);
        ctx.font = "50px Arial";
        ctx.fillText("WYGRAŁEŚ", maxX/2 - 150, maxY/2);
    }
    for (let obstacle of obstacles) {
        if (checkCollision(player, obstacle)) {
            ctx.clearRect(0, 0, maxX, maxY);
            ctx.font = "50px Arial";
            ctx.fillText("PRZEGRAŁEŚ", maxX/2 - 150, maxY/2);
        }
    }
    requestAnimationFrame(update);
}

setUp();

document.addEventListener('keydown', event => {
    if ((event.key === "ArrowLeft") && (player.x - player.width/2 > 0)) {
        player.x -= 5;
    } else if ((event.key === "ArrowRight") && (player.x + player.width/2 < maxX)) {
        player.x += 5;
    } else if ((event.key === "ArrowUp") && (player.y - player.height/2 > 0)) {
        player.y -= 5;
    } else if ((event.key === "ArrowDown") && (player.y + player.height/2 < maxY)) {
        player.y += 5;
    }
});

update();

