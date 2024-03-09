const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scorebox = document.getElementById("Score");

const playerWidth = 30;
const playerHeight = 30;
const playerSpeed = 15;
let playerX = canvas.width / 2 - playerWidth / 2;
let playerY = canvas.height - playerHeight - 10;

let bulletWidth = 5;
let bulletHeight = 10;
let bulletSpeed = 7;
let bullets = [];

let score = 0;
let enemytimer = 2000;

const enemyWidth = 30;
const enemyHeight = 30;
const enemySpeed = 1;
let enemies = [];

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
    });
}

function drawEnemies() {
    ctx.fillStyle = "green";
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
    });
}

function movePlayer(direction) {
    if (direction === "left" && playerX > 0) {
        playerX -= playerSpeed;
    } else if (direction === "right" && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
}

function shootBullet() {
    bullets.push({
        x: playerX + playerWidth / 2 - bulletWidth / 2,
        y: playerY - bulletHeight
    });
}

function createEnemy() {
    enemies.push({
        x: Math.random() * (canvas.width - enemyWidth),
        y: 0
    });
}

function updateBullets() {
    bullets = bullets.filter(bullet => bullet.y > 0);
    bullets.forEach(bullet => {
        bullet.y -= bulletSpeed;
    });
}

function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.y += enemySpeed;
    });
}

function detectCollisions() {
    bullets.forEach(bullet => {
        enemies.forEach(enemy => {
            if (
                bullet.x < enemy.x + enemyWidth &&
                bullet.x + bulletWidth > enemy.x &&
                bullet.y < enemy.y + enemyHeight &&
                bullet.y + bulletHeight > enemy.y
            ) {
                // Collision detected
                bullets.splice(bullets.indexOf(bullet), 1);
                enemies.splice(enemies.indexOf(enemy), 1);
				
				score++;
				scorebox.value = score;
				//clearInterval()
				//if(enemytimer > 0){
				//	enemytimer--;
				//}
				
				//setInterval(createEnemy, enemytimer);
				
            }
        });
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawEnemies();

    updateBullets();
    updateEnemies();
    detectCollisions();

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        movePlayer("left");
    } else if (event.key === "ArrowRight") {
        movePlayer("right");
    } else if (event.key === " ") {
        shootBullet();
    }
});

setInterval(createEnemy, enemytimer);

gameLoop();
