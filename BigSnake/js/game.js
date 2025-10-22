
// Adicione isto no início do arquivo (caso não exista)
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-button') || document.getElementById('start-button');
    
    if (startButton) {
        startButton.addEventListener('click', function() {
            console.log('Botão clicado!'); // Para debug
            startGame();
        });
    } else {
        console.error('Botão de iniciar não encontrado!');
    }
});

function startGame() {
    // Adicione no início da função que inicia o jogo
    console.log('Função de iniciar jogo chamada');
    // Código existente para iniciar o jogo
    console.log('Jogo iniciado!');
    // Esconda o menu e mostre o jogo
    const gameMenu = document.querySelector('.game-menu') || document.getElementById('game-menu');
    const gameContainer = document.querySelector('.game-container') || document.getElementById('game-container');
    
    if (gameMenu) gameMenu.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'block';
    
    // Inicialize o jogo
    initializeGame(); // Esta função deve existir no seu código
}
class Game {
    constructor() {
        // Elementos do DOM
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.scoreElement = document.getElementById("score");
        this.levelElement = document.getElementById("level");
        this.finalScoreElement = document.getElementById("final-score");
        this.highScoresList = document.getElementById("high-scores-list");
        this.newLevelElement = document.getElementById("new-level");
        this.levelMessageElement = document.getElementById("level-message");
        
        // Telas
        this.startScreen = document.getElementById("start-screen");
        this.gameOverScreen = document.getElementById("game-over");
        this.levelUpScreen = document.getElementById("level-up");
        
        // Botões
        this.startButton = document.getElementById("start-button");
        this.restartButton = document.getElementById("restart-button");
        this.continueButton = document.getElementById("continue-button");
        
        // Configurações do jogo
        this.cellSize = 20;
        this.score = 0;
        this.highScores = [];
        this.loadHighScores();
        this.gameLoop = null;
        this.isGameRunning = false;
        this.isPaused = false;
        
        // Inicializa objetos do jogo
        this.snake = new Snake(this.canvas, this.cellSize);
        this.food = new Food(this.canvas, this.cellSize, "good");
        this.levelManager = new LevelManager(this);
        
        // Configura áudio
        this.setupAudio();
        
        // Configura eventos
        this.setupEventListeners();
        
        // Mostra a tela inicial
        this.showStartScreen();
    }
    
    // Configura os efeitos sonoros e música
    setupAudio() {
        this.sounds = {
            eat: new Audio("data:audio/wav;base64,UklGRmQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YUBFAAA9PExibXiAh4uOkJGRj42JhHx0a2FWS0A2KyEYDwcA+vTv6+nm5OPj5OXn6u3x9fn9AAAAAAAAAAAAAAAAAAAAAPz49vTy8O/u7u7v8PHz9ff5+/z9/f39/Pv5+Pb08vDu7ezs7O3u8PHz9ff5+/z9/v7+/v38+vj29PLw7+3t7e7v8fP19/n7/P3+/v79/Pv5+Pb08vDv7u7u7/Dy9Pb4+vv9/f7+/v38+/n39fPx8O7t7e7v8PL09vj6/P3+/v///v38+vn39fPx8O/u7u/w8vT2+Pr7/f3+/v/+/fz7+fj29PLw7+7u7u/x8/X3+fr8/f7+/v79/Pv5+Pf18/Hw7+7u7/Dy9Pb4+vv9/f7+//7+/fz6+fj29PLx7+7u7/Dy9PX3+fr8/P3+/v79/Pv6+fj29fPx8O/v7/Dx8/X3+fr7/P3+/v79/Pv6+fj39fTy8fDv7/Dx8/T2+Pr7/P3+/v79/fz7+vn49/X08vHw7+/w8fP19vj5+/z9/f7+/fz7+vr5+Pf19PPy8fDw8PHy9PX3+Pr7/P39/v79/Pz7+vr5+Pf29fTz8vHx8fLz9PX3+Pn6+/z9/f79/fz8+/r6+fj39vX08/Py8vLz9PX2+Pn6+/z8/f39/Pz7+/r6+fj39/b19PTz8/P09fb3+Pn6+/z8/f39/Pz8+/v6+vn5+Pf39vb19fT09PX19vf4+fn6+/v8/Pz9/fz8/Pv7+/r6+fn4+Pf39vb29fX19fb29/j4+fn6+/v7/Pz8/Pz8+/v7+vr6+fn5+Pj39/f29vb29vb3+Pj4+fn6+vr7+/v8/Pz8/Pz7+/v7+/r6+vn5+fj4+Pj39/f39/f3+Pj4+fn5+vr6+/v7+/v8/Pz8/Pz8+/v7+/v6+vr6+fn5+fj4+Pj4+Pj4+Pn5+fn5+vr6+vv7+/v7+/z8/Pz8/Pz8+/v7+/v7+/r6+vr6+fn5+fn5+fn5+fn5+fr6+vr6+vr7+/v7+/v7+/v8/Pz8/Pz8/Pz8+/v7+/v7+/v7+/r6+vr6+vr6+vr6+vr6+vr6+vr7+/v7+/v7+/v7+/v7/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/s="),
            gameOver: new Audio("data:audio/wav;base64,UklGRogEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YWQEAACBgH9+fXx7enl4d3Z1dHNzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=="),
            levelUp: new Audio("data:audio/wav;base64,UklGRqQDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YYADAAAJBAsGDAcNCA4JDwoQCxEMEg0TDhQPFRAWERcSGBMZFBoVGxYcFx0YHhkfGiAbIRwiHSMeJB8lICYhJyIoIykjKSQqJCokKiQqJCokKiQqJComKScpJyknKCUoJSgkJyMnIiYhJiAmHyUeJR0kHCMbIhsiGiEZIBkgGB8XHhceGBwXHRcdFx0XHRcdFx0XHRceFx4XHhceGB4YHhgeGB4YHhgeGB8YHxgfGB8YHxgfGB8YHxkfGR8ZHxkfGR8ZHxkfGR8ZHxkgGSAZIBkgGSAZIBkgGSAZIBkgGiAaIBogGiAaIBogGiAaIBogGiEaIRohGiEaIRohGiEaIRohGiIaIhoiGiIaIhoiGiIaIhoiGiIbIhsiGyIbIhsiGyIbIhsiGyIbIxsjGyMbIxsjGyMbIxsjGyMbIxwjHCMcIxwjHCMcIxwjHCMcIxwkHCQcJBwkHCQcJBwkHCQcJBwlHCUcJRwlHCUcJRwlHCUcJRwmHCYcJhwmHCYcJhwmHCYcJhwnHCccJxwnHCccJxwnHCccJxwoHCgcKBwoHCgcKBwoHCgcKBwpHCkcKRwpHCkcKRwpHCkcKhwqHCocKhwqHCocKhwqHCocKxwrHCscKxwrHCscKxwrHCscLBwsHCwcLBwsHCwcLBwsHC0cLRwtHC0cLRwtHC0cLRwtHC4cLhwuHC4cLhwuHC4cLhwuHC8cLxwvHC8cLxwvHC8cLxwwHDAcMBwwHDAcMBwwHDAcMRwxHDEcMRwxHDEcMRwxHDEcMhwyHDIcMhwyHDIcMhwyHDIcMxwzHDMcMxwzHDMcMxwzHDMcNBw0HDQcNBw0HDQcNBw0HDQcNRw1HDUcNRw1HDUcNRw1HDUcNhw2HDYcNhw2HDYcNhw2HDYcNxw3HDccNxw3HDccNxw3HDccOBw4HDgcOBw4HDgcOBw4HDgcORw5HDkcORw5HDkcORw5HDkcOhw6HDocOhw6HDscPBw9HD4cPxw/HEAcQRxCHEMcRBxFHEYcRxxIHEkcShxLHEwcTRxOHE8cUBxRHFIcUxxUHFUcVhxXHFgcWRxaHFscXBxdHF4cXxxgHGEcYhxjHGQcZRxmHGgcaRxqHGscbBxuHG8ccBxyHHMcdRx2HHgceRx7HHwcfhyAHIEcgxyFHIcciRyLHI0cjxyRHJMclhyYHJoclxyaHJ0coByiHKUcqByrHK4csRy0HLgcuxzZHNwc4BzjHOcc"),
            music: new Audio("data:audio/wav;base64,UklGRiQDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQADAACBgYKBgoGCgYOBg4GEgYSBhYGFgYaBhoGHgYeBiIGIgYmBiYGKgYqBi4GLgYyBjIGNgY2BjoGOgY+Bj4GQgZCBkYGRgZKBkoGTgZOBlIGUgZWBlYGWgZaBl4GXgZiBmIGZgZmBmoGagZuBm4GcgZyBnYGdgZ6BnoGfgZ+BoIGggaGBoYGigaKBo4GjgaSBpIGlgaWBpoGmgaeBp4GogaiBqYGpgaqBqoGrgauBrIGsga2BrYGuga6Br4GvgbCBsIGxgbGBsoGygbOBs4G0gbSBtYG1gbaBtoG3gbeBuIG4gbmBuYG6gbqBu4G7gbyBvIG9gb2BvoG+gb+Bv4HAgcCBwYHBgcKBwoHDgcOBxIHEgcWBxYHGgcaBx4HHgciBzYHSgdaB24HfgeSB6IHtgfGB9oH6gf+CAoIHgguCEIIUghmCHYIigh+CI4IngiuCMII0gjmCPYJCgkaCTIJQglWCWYJegl+CZIJogm2CcoJ2gn2CgYKGgoqCkYKVgpqCn4KkgqmCroKzgriCvYLCgseC7ILyguKC6YLvgvWC/IL/ggqDEIMWgx+DJ4MtgzWDO4NDg0uDUYNbg2GDZ4Ntg3SDeoOAg4iDjIOUg5qDooOqg7GDuoO/g8eDzoRghmGHK4hxilaKxovkjGyNIY8Fj2WQ4JIwkzmUspWxlpiX0ZgVmi6alJsNm4ab5pxRna+eA6AQoRmiJaNXpG2lt6a+p8CouanDqsmrzKzNrc6uz6/QsNGx0rLTs9S01bXWtte32LjZudq727zcvd2+3r/gwOHC48TlxufI6croytHM1M7W0NjS2tTc1t7Y4Nri3OTe5uDo4uro7Oru7PDu8vD08vT29vj4+vz8AAAAAgACAAQABgAIAAoADAAOABAAEgAUABYAGAAaABwAHgAgACIAJAAmACgAKgAsAC4AMAAvAC8ALQAtACsAKwApACkAJwAnACUAJQAjACMAIQAhAB8AHwAdAB0AGwAbABkAGQAXABcAFQAVABMAEwARABEADwAPAA0ADQALAAsACQAJAAcABwAFAAUAAwADAAEAAQA=")
        };
        
        // Configurações de volume
        this.sounds.eat.volume = 0.3;
        this.sounds.gameOver.volume = 0.5;
        this.sounds.levelUp.volume = 0.4;
        this.sounds.music.volume = 0.2;
        this.sounds.music.loop = true;
    }
    
    // Configura os event listeners para os botões e teclado
    setupEventListeners() {
        // Eventos de botões
        this.startButton.addEventListener("click", () => this.startGame());
        this.restartButton.addEventListener("click", () => this.restartGame());
        this.continueButton.addEventListener("click", () => this.continueAfterLevelUp());
        
        // Eventos de teclado
        document.addEventListener("keydown", (event) => {
            if (!this.isGameRunning || this.isPaused) return;
            
            switch (event.key) {
                case "ArrowUp":
                case "w":
                case "W":
                    this.snake.setDirection("up");
                    break;
                case "ArrowDown":
                case "s":
                case "S":
                    this.snake.setDirection("down");
                    break;
                case "ArrowLeft":
                case "a":
                case "A":
                    this.snake.setDirection("left");
                    break;
                case "ArrowRight":
                case "d":
                case "D":
                    this.snake.setDirection("right");
                    break;
                case "p":
                case "P":
                    this.togglePause();
                    break;
            }
        });
    }
    
    // Inicia o jogo
    startGame() {
        this.startScreen.classList.add("hidden");
        this.isGameRunning = true;
        this.isPaused = false;
        this.score = 0;
        this.updateScore();
        this.updateLevel();
        
        // Posiciona a cobra e a comida inicial
        this.snake.reset();
        this.food.place(this.snake);
        
        // Inicia a música
        this.sounds.music.currentTime = 0;
        this.sounds.music.play();
        
        // Configura o loop do jogo
        this.gameLoop = setInterval(() => this.update(), 1000 / this.levelManager.getCurrentLevelConfig().speed);
    }
    
    // Reinicia o jogo
    restartGame() {
        this.gameOverScreen.classList.add("hidden");
        this.levelManager.reset();
        this.startGame();
    }
    
    // Continua após subir de nível
    continueAfterLevelUp() {
        this.levelUpScreen.classList.add("hidden");
        this.isPaused = false;
        
        // Atualiza a velocidade do jogo
        clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / this.levelManager.getCurrentLevelConfig().speed);
    }
    
    // Pausa ou despausa o jogo
    togglePause() {
        this.isPaused = !this.isPaused;
    }
    
    // Atualiza o estado do jogo a cada frame
    update() {
        if (!this.isGameRunning || this.isPaused) return;
        
        // Move a cobra
        this.snake.move();
        
        // Verifica colisão com bordas
        if (this.snake.checkBorderCollision()) {
            this.gameOver();
            return;
        }
        
        // Verifica colisão com o próprio corpo
        if (this.snake.checkSelfCollision()) {
            this.gameOver();
            return;
        }
        
        // Verifica colisão com obstáculos
        if (this.snake.checkObstacleCollision(this.levelManager.getCurrentObstacles())) {
            this.gameOver();
            return;
        }
        
        // Verifica colisão com comida
        if (this.snake.checkFoodCollision(this.food)) {
            const foodInfo = this.food.getInfo();
            
            // Reproduz som
            this.sounds.eat.currentTime = 0;
            this.sounds.eat.play();
            
            // Processa efeitos da comida
            if (foodInfo.value > 0) { // Comida boa
                this.score += foodInfo.value;
                this.updateScore();
                this.snake.grow(foodInfo.growth);
            } else { // Comida ruim
                this.score = Math.max(0, this.score + foodInfo.value);
                this.updateScore();
                
                if (foodInfo.effect === "shrink") {
                    this.snake.shrink(Math.abs(foodInfo.growth));
                } else if (foodInfo.effect === "confusion") {
                    this.snake.activateConfusion(60); // 60 frames ~= 3 segundos a 20fps
                }
            }
            
            // Escolhe o tipo da próxima comida
            const levelConfig = this.levelManager.getCurrentLevelConfig();
            const foodType = Math.random() < levelConfig.badFoodProbability ? "bad" : "good";
            this.food.setType(foodType);
            
            // Posiciona a nova comida
            this.food.place(this.snake, this.levelManager.getCurrentObstacles());
            
            // Verifica se deve passar de nível
            if (this.snake.getSizePercentage() >= 80) {
                this.levelUp();
            }
        }
        
        // Desenha o jogo
        this.draw();
    }
    
    // Desenha todos os elementos na tela
    draw() {
        // Limpa a tela
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenha fundo
        this.drawBackground();
        
        // Desenha os obstáculos
        this.levelManager.drawObstacles();
        
        // Desenha a comida
        this.food.draw();
        
        // Desenha a cobra
        this.snake.draw();
    }
    
    // Desenha o fundo do jogo
    drawBackground() {
        // Desenha um padrão de fundo quadriculado sutil
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = "#0a0a0a";
        const gridSize = this.cellSize * 2;
        
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            for (let y = 0; y < this.canvas.height; y += gridSize) {
                if ((x / gridSize + y / gridSize) % 2 === 0) {
                    this.ctx.fillRect(x, y, gridSize, gridSize);
                }
            }
        }
    }
    
    // Processa o fim do jogo
    gameOver() {
        this.isGameRunning = false;
        clearInterval(this.gameLoop);
        
        // Salva a pontuação
        this.saveScore(this.score);
        this.finalScoreElement.textContent = this.score;
        
        // Atualiza a lista de recordes
        this.updateHighScoresList();
        
        // Para a música e toca o som de game over
        this.sounds.music.pause();
        this.sounds.gameOver.currentTime = 0;
        this.sounds.gameOver.play();
        
        // Mostra a tela de game over
        this.gameOverScreen.classList.remove("hidden");
    }
    
    // Processa a mudança de nível
    levelUp() {
        this.isPaused = true;
        
        // Avança para o próximo nível
        const levelData = this.levelManager.nextLevel();
        
        // Atualiza elementos da tela
        this.updateLevel();
        this.newLevelElement.textContent = levelData.level;
        this.levelMessageElement.textContent = this.levelManager.getLevelMessage();
        
        // Toca o som de subida de nível
        this.sounds.levelUp.currentTime = 0;
        this.sounds.levelUp.play();
        
        // Mostra a tela de novo nível
        this.levelUpScreen.classList.remove("hidden");
    }
    
    // Atualiza o contador de pontuação
    updateScore() {
        this.scoreElement.textContent = this.score;
    }
}