// Variáveis globais necessárias
let snake;
let food;
let gameCanvas;
let ctx;
let gameInterval;
let score = 0;
let gameSpeed = 100; // Velocidade inicial do jogo (ms)
let gameRunning = false;
let currentLevel = 0;
let lastCheckedScore = 0; // Para verificar avanço de nível

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado");
    
    // Verifica se o canvas existe
    gameCanvas = document.getElementById('gameCanvas');
    if (gameCanvas) {
        console.log("Canvas encontrado");
        // Pegue o contexto aqui, mas não use ainda
        ctx = gameCanvas.getContext('2d');
    } else {
        console.error("Canvas não encontrado no DOM!");
    }
    
    const startButton = document.querySelector('.start-button') || document.getElementById('start-button');
    if (startButton) {
        console.log("Botão de início encontrado");
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
    
    // Verificar se o canvas foi encontrado
    if (!gameCanvas || !ctx) {
        console.error("Canvas ou contexto não encontrado!");
        return;
    }
    
    // Esconda o menu e mostre o jogo
    const gameMenu = document.querySelector('.game-menu') || document.getElementById('game-menu');
    const gameContainer = document.querySelector('.game-container') || document.getElementById('game-container');
    
    if (gameMenu) gameMenu.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'block';
    
    console.log('Jogo iniciado!');
    
    // Inicialize o jogo
    initializeGame();
}

function initializeGame() {
    // Inicialize a cobra
    snake = new Snake();
    
    // Inicialize a comida
    food = new Food();
    food.generateNewPosition();
    
    // Reiniciar a pontuação e nível
    score = 0;
    currentLevel = 0;
    lastCheckedScore = 0;
    updateScore();
    
    // Aplicar o nível inicial
    const gameObj = {
        gameInterval: gameInterval,
        gameSpeed: gameSpeed,
        gameLoop: gameLoop
    };
    levels[0].apply(gameObj);
    gameInterval = gameObj.gameInterval;
    gameSpeed = gameObj.gameSpeed;
    
    // Inicie o jogo
    gameRunning = true;
    
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
        snake.grow();
        food.generateNewPosition();
        score += 10;
        updateScore();
        
        // Verifique se deve avançar de nível
        checkLevelProgress();
    }
    
    // Verifique colisão com as paredes ou com si mesma
    if (snake.checkCollision()) {
        gameOver();
        return;
    }
    
    // Desenhe os elementos
    snake.draw(ctx);
    food.draw(ctx);
    
    // Efeito pulsante na comida
    const pulseEffect = Math.sin(Date.now() / 200) * 0.2 + 0.8;
    food.pulseFactor = pulseEffect;
}

function checkLevelProgress() {
    // Verifica se a pontuação atual corresponde a um novo nível
    const appropriateLevel = getLevelByScore(score);
    
    // Se encontrou um nível diferente do atual
    if (appropriateLevel.requiredScore !== lastCheckedScore) {
        lastCheckedScore = appropriateLevel.requiredScore;
        
        // Aplica o novo nível
        const gameObj = {
            gameInterval: gameInterval,
            gameSpeed: gameSpeed,
            gameLoop: gameLoop
        };
        appropriateLevel.apply(gameObj);
        gameInterval = gameObj.gameInterval;
        gameSpeed = gameObj.gameSpeed;
        
        // Exibe mensagem de novo nível
        showLevelUpMessage(appropriateLevel.name);
    }
}

function showLevelUpMessage(levelName) {
    // Cria um elemento temporário para mostrar a mensagem de nível
    const levelUpMsg = document.createElement('div');
    levelUpMsg.className = 'level-up-message';
    levelUpMsg.textContent = `NÍVEL ${levelName}!`;
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.appendChild(levelUpMsg);
        
        // Remove a mensagem após 2 segundos
        setTimeout(() => {
            gameContainer.removeChild(levelUpMsg);
        }, 2000);
    }
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
}