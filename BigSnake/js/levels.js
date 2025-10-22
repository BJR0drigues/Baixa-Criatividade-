// Este arquivo pode ser usado para definir diferentes níveis e dificuldades
class Level {
    constructor(speed, obstacles = []) {
        this.speed = speed;
        this.obstacles = obstacles;
    }
    
    apply() {
        // Define a velocidade do jogo para este nível
        gameSpeed = this.speed;
        
        // Aplica outros ajustes específicos do nível
        // ...
    }
}

// Definição de níveis
const levels = [
    new Level(150), // Nível 1 - Lento
    new Level(100), // Nível 2 - Médio
    new Level(70)   // Nível 3 - Rápido
];

// Função para avançar para o próximo nível
function advanceLevel(currentLevel) {
    if (currentLevel < levels.length - 1) {
        const nextLevel = levels[currentLevel + 1];
        nextLevel.apply();
        return currentLevel + 1;
    }
    return currentLevel;
}