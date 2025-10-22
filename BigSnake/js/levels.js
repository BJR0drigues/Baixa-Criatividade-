// Este arquivo define diferentes níveis e dificuldades
class Level {
    constructor(speed, requiredScore, name, color) {
        this.speed = speed;
        this.requiredScore = requiredScore;
        this.name = name;
        this.color = color;
    }
    
    apply(gameObject) {
        // Define a velocidade do jogo para este nível
        if (gameObject.gameInterval) clearInterval(gameObject.gameInterval);
        gameObject.gameSpeed = this.speed;
        gameObject.gameInterval = setInterval(gameObject.gameLoop, this.speed);
        
        // Atualiza o indicador de nível
        const levelElement = document.getElementById('level');
        if (levelElement) {
            levelElement.textContent = this.name;
            levelElement.style.color = this.color;
        }
        
        // Efeito visual para mudança de nível
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.classList.add('level-up');
            setTimeout(() => {
                gameContainer.classList.remove('level-up');
            }, 1000);
        }
    }
}

// Definição de níveis
const levels = [
    new Level(150, 0, "Novato", "#00FF00"),        // Nível 1 - Lento
    new Level(130, 50, "Aprendiz", "#22FFDD"),     // Nível 2
    new Level(110, 100, "Intermediário", "#44BBFF"),// Nível 3
    new Level(90, 200, "Avançado", "#FF44FF"),     // Nível 4
    new Level(70, 350, "Especialista", "#FFAA00"), // Nível 5
    new Level(50, 500, "Mestre", "#FF0000")       // Nível 6 - Muito rápido
];

// Função para obter o nível com base na pontuação
function getLevelByScore(score) {
    for (let i = levels.length - 1; i >= 0; i--) {
        if (score >= levels[i].requiredScore) {
            return levels[i];
        }
    }
    return levels[0]; // Nível padrão
}