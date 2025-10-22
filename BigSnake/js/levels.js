class LevelManager {
    constructor(game) {
        this.game = game;
        this.currentLevel = 1;
        this.levels = [
            // Nível 1
            {
                speed: 8, // Velocidade lenta
                badFoodProbability: 0, // Sem comida ruim
                obstacles: [] // Sem obstáculos
            },
            // Nível 2
            {
                speed: 10, // Velocidade média
                badFoodProbability: 0.2, // 20% de chance de comida estragada
                obstacles: [] // Sem obstáculos ainda
            },
            // Nível 3
            {
                speed: 12, // Velocidade rápida
                badFoodProbability: 0.3, // 30% de chance de comida estragada
                obstacles: this.generateObstacles(5) // 5 obstáculos
            },
            // Nível 4
            {
                speed: 14,
                badFoodProbability: 0.4,
                obstacles: this.generateObstacles(10) // 10 obstáculos
            },
            // Nível 5
            {
                speed: 16,
                badFoodProbability: 0.5,
                obstacles: this.generateObstacles(15) // 15 obstáculos
            }
        ];
    }

    // Gera obstáculos aleatórios
    generateObstacles(count) {
        const canvas = this.game.canvas;
        const cellSize = this.game.cellSize;
        const obstacles = [];
        
        const width = canvas.width / cellSize;
        const height = canvas.height / cellSize;
        
        // Evita colocar obstáculos muito perto do centro, onde a cobra começa
        const centerX = Math.floor(width / 2);
        const centerY = Math.floor(height / 2);
        const safeRadius = 5; // células seguras ao redor do centro
        
        for (let i = 0; i < count; i++) {
            let x, y;
            let validPosition = false;
            
            while (!validPosition) {
                x = Math.floor(Math.random() * width);
                y = Math.floor(Math.random() * height);
                
                // Verifica se está fora da área segura do centro
                const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                
                // Verifica se não coincide com outros obstáculos
                const noCollision = obstacles.every(obs => !(obs.x === x && obs.y === y));
                
                validPosition = distFromCenter > safeRadius && noCollision;
            }
            
            obstacles.push({ x, y });
        }
        
        return obstacles;
    }

    // Avança para o próximo nível
    nextLevel() {
        this.currentLevel++;
        
        // Se passou do último nível definido, cria um novo mais difícil
        if (this.currentLevel > this.levels.length) {
            const lastLevel = this.levels[this.levels.length - 1];
            const newLevel = {
                speed: lastLevel.speed + 2, // Aumenta velocidade
                badFoodProbability: Math.min(0.7, lastLevel.badFoodProbability + 0.1), // Aumenta comidas ruins até 70%
                obstacles: this.generateObstacles(15 + 5 * (this.currentLevel - this.levels.length)) // Mais obstáculos
            };
            this.levels.push(newLevel);
        }
        
        return {
            level: this.currentLevel,
            config: this.getCurrentLevelConfig()
        };
    }

    // Obtém configuração do nível atual
    getCurrentLevelConfig() {
        return this.levels[this.currentLevel - 1];
    }

    // Desenha obstáculos do nível atual
    drawObstacles() {
        const obstacles = this.getCurrentLevelConfig().obstacles;
        const ctx = this.game.canvas.getContext("2d");
        const cellSize = this.game.cellSize;
        
        ctx.fillStyle = "#555555";
        
        obstacles.forEach(obstacle => {
            // Desenha bloco de parede
            ctx.fillStyle = "#555555";
            ctx.fillRect(
                obstacle.x * cellSize,
                obstacle.y * cellSize,
                cellSize,
                cellSize
            );
            
            // Adiciona detalhes de tijolos
            ctx.fillStyle = "#333333";
            
            // Linha horizontal no meio
            ctx.fillRect(
                obstacle.x * cellSize,
                obstacle.y * cellSize + cellSize/2 - 1,
                cellSize,
                2
            );
            
            // Linhas verticais alternadas
            ctx.fillRect(
                obstacle.x * cellSize + cellSize/4,
                obstacle.y * cellSize,
                2,
                cellSize/2 - 1
            );
            
            ctx.fillRect(
                obstacle.x * cellSize + cellSize*3/4 - 2,
                obstacle.y * cellSize,
                2,
                cellSize/2 - 1
            );
            
            ctx.fillRect(
                obstacle.x * cellSize + cellSize/2 - 1,
                obstacle.y * cellSize + cellSize/2 + 1,
                2,
                cellSize/2 - 1
            );
        });
    }

    // Retorna os obstáculos do nível atual
    getCurrentObstacles() {
        return this.getCurrentLevelConfig().obstacles;
    }
    
    // Retorna a mensagem para o próximo nível
    getLevelMessage() {
        switch(this.currentLevel) {
            case 2:
                return "Cuidado com as comidas estragadas!";
            case 3:
                return "Agora há obstáculos no caminho!";
            case 4:
                return "A velocidade aumentou! Tenha cuidado!";
            case 5:
                return "Nível máximo de dificuldade! Boa sorte!";
            default:
                return "Desafio aumentando! Fique atento!";
        }
    }
    
    // Reseta o gerenciador de níveis
    reset() {
        this.currentLevel = 1;
    }
}