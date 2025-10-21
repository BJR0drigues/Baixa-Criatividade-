// Configuração do Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Estado do jogo
let gameState = {
    running: false,
    paused: false,
    score: 0
};

// Jogador
const player = {
    x: 100,
    y: canvas.height - 100,
    width: 40,
    height: 40,
    color: '#4caf50',
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpPower: 12,
    gravity: 0.5,
    onGround: false
};

// Plataforma
const platform = {
    x: 0,
    y: canvas.height - 50,
    width: canvas.width,
    height: 50,
    color: '#795548'
};

// Obstáculos
let obstacles = [];
let obstacleSpeed = 3;
let obstacleSpawnTimer = 0;

// Controles
const keys = {
    left: false,
    right: false,
    space: false
};

// Event Listeners para teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        keys.space = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === ' ' || e.key === 'Spacebar') keys.space = false;
});

// Botões de controle
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('resetBtn').addEventListener('click', resetGame);

// Função para iniciar o jogo
function startGame() {
    if (!gameState.running) {
        gameState.running = true;
        gameState.paused = false;
        gameLoop();
    }
}

// Função para pausar/despausar
function togglePause() {
    if (gameState.running) {
        gameState.paused = !gameState.paused;
        if (!gameState.paused) {
            gameLoop();
        }
    }
}

// Função para resetar o jogo
function resetGame() {
    gameState.running = false;
    gameState.paused = false;
    gameState.score = 0;
    player.x = 100;
    player.y = canvas.height - 100;
    player.velocityX = 0;
    player.velocityY = 0;
    player.onGround = false;
    obstacles = [];
    obstacleSpawnTimer = 0;
    updateScore();
    draw();
}

// Atualizar pontuação
function updateScore() {
    document.getElementById('score').textContent = gameState.score;
}

// Criar obstáculo
function createObstacle() {
    const obstacle = {
        x: canvas.width,
        y: canvas.height - 50 - 30,
        width: 30,
        height: 30,
        color: '#f44336'
    };
    obstacles.push(obstacle);
}

// Atualizar física do jogador
function updatePlayer() {
    // Movimento horizontal
    if (keys.left) {
        player.velocityX = -player.speed;
    } else if (keys.right) {
        player.velocityX = player.speed;
    } else {
        player.velocityX = 0;
    }

    // Pulo
    if (keys.space && player.onGround) {
        player.velocityY = -player.jumpPower;
        player.onGround = false;
    }

    // Aplicar gravidade
    player.velocityY += player.gravity;

    // Atualizar posição
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Verificar limites horizontais
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    // Verificar colisão com plataforma
    if (player.y + player.height >= platform.y) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.onGround = true;
    }
}

// Atualizar obstáculos
function updateObstacles() {
    obstacleSpawnTimer++;
    
    // Criar novo obstáculo a cada 100 frames
    if (obstacleSpawnTimer > 100) {
        createObstacle();
        obstacleSpawnTimer = 0;
    }

    // Mover obstáculos
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= obstacleSpeed;

        // Remover obstáculos que saíram da tela
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            gameState.score += 10;
            updateScore();
        }
    }
}

// Verificar colisões
function checkCollisions() {
    for (let obstacle of obstacles) {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            // Colisão detectada - fim de jogo
            gameState.running = false;
            alert(`Fim de jogo! Pontuação: ${gameState.score}`);
            resetGame();
        }
    }
}

// Desenhar tudo
function draw() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar plataforma
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

    // Desenhar jogador
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Desenhar obstáculos
    for (let obstacle of obstacles) {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// Loop principal do jogo
function gameLoop() {
    if (!gameState.running || gameState.paused) {
        return;
    }

    updatePlayer();
    updateObstacles();
    checkCollisions();
    draw();

    requestAnimationFrame(gameLoop);
}

// Desenhar estado inicial
draw();
