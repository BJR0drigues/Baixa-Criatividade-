// Variáveis globais necessárias
let snake;
let food;
let gameCanvas;
let ctx;
let gameInterval;
let score = 0;
let gameSpeed = 100; // Velocidade inicial do jogo (ms)
let gameRunning = false;

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-button') || document.getElementById('start-button');
    
    if (startButton) {
        startButton.addEventListener('click', function() {
            console.log('Botão clicado!');
            startGame();
        });
    } else {
        console.error('Botão de iniciar não encontrado!');
    }
});

function startGame() {
    console.log('Função de iniciar jogo chamada');
    
    // Esconda o menu e mostre o jogo
    const gameMenu = document.querySelector('.game-menu') || document.getElementById('game-menu');
    const gameContainer = document.querySelector('.game-container') || document.getElementById('game-container');
    
    if (gameMenu) gameMenu.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'block';
    
    console.log('Jogo iniciado!');
    
    // Inicialize o jogo - aqui estava faltando a função
    initializeGame(); 
}

// Adicione esta função que está faltando
function initializeGame() {
    // Obtenha o canvas e o contexto
    gameCanvas = document.getElementById('gameCanvas');
    if (!gameCanvas) {
        console.error("Canvas não encontrado!");
        return;
    }
    
    ctx = gameCanvas.getContext('2d');
    
    // Inicialize a cobra
    snake = new Snake();
    
    // Inicialize a comida
    food = new Food();
    food.generateNewPosition();
    
    // Inicie a função de jogo em um intervalo
    if (gameInterval) clearInterval(gameInterval);
    gameRunning = true;
    gameInterval = setInterval(gameLoop, gameSpeed);
    
    // Adicione os controles de teclado
    document.addEventListener('keydown', handleKeyPress);
}

function gameLoop() {
    if (!gameRunning) return;
    
    // Limpe o canvas
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    // Atualize a cobra
    snake.update();
    
    // Verifique colisão com a comida
    if (snake.checkFoodCollision(food)) {
        food.generateNewPosition();
        score += 10;
        updateScore();
    }
    
    // Verifique colisão com as paredes ou com si mesma
    if (snake.checkCollision()) {
        gameOver();
        return;
    }
    
    // Desenhe os elementos
    snake.draw(ctx);
    food.draw(ctx);
}

function handleKeyPress(event) {
    // Controle da cobra com as setas do teclado
    switch (event.key) {
        case "ArrowUp":
            if (snake.direction !== "down") snake.changeDirection("up");
            break;
        case "ArrowDown":
            if (snake.direction !== "up") snake.changeDirection("down");
            break;
        case "ArrowLeft":
            if (snake.direction !== "right") snake.changeDirection("left");
            break;
        case "ArrowRight":
            if (snake.direction !== "left") snake.changeDirection("right");
            break;
    }
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameInterval);
    alert(`Fim de jogo! Pontuação: ${score}`);
    
    // Mostrar menu novamente
    const gameMenu = document.querySelector('.game-menu') || document.getElementById('game-menu');
    const gameContainer = document.querySelector('.game-container') || document.getElementById('game-container');
    
    if (gameMenu) gameMenu.style.display = 'block';
    if (gameContainer) gameContainer.style.display = 'none';
    
    // Resetar jogo
    score = 0;
    updateScore();
}