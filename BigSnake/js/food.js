class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.gridSize = 20;
        this.pulseFactor = 1; // Para efeito visual
        this.foodTypes = [
            { color: "#FF0000", points: 10 },  // Comida padrão - maçã
            { color: "#FFFF00", points: 20 },  // Comida especial - banana
            { color: "#FF00FF", points: 30 }   // Comida rara - uva
        ];
        this.currentType = this.foodTypes[0];
    }
    
    generateNewPosition() {
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) {
            console.error("Canvas não encontrado ao gerar posição de comida!");
            return;
        }
        
        const maxX = Math.floor(canvas.width / this.gridSize) - 1;
        const maxY = Math.floor(canvas.height / this.gridSize) - 1;
        
        this.position = {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        };
        
        // 15% de chance de gerar comida especial
        const foodTypeRandom = Math.random();
        if (foodTypeRandom < 0.05) {
            this.currentType = this.foodTypes[2]; // Comida rara
        } else if (foodTypeRandom < 0.20) {
            this.currentType = this.foodTypes[1]; // Comida especial
        } else {
            this.currentType = this.foodTypes[0]; // Comida padrão
        }
    }
    
    draw(ctx) {
        if (!ctx) {
            console.error("Contexto não definido para desenhar comida!");
            return;
        }
        
        // Aplica a cor atual da comida
        ctx.fillStyle = this.currentType.color;
        
        // Tamanho ajustado com base no fator de pulsação
        const size = this.gridSize * this.pulseFactor;
        const offset = (this.gridSize - size) / 2;
        
        ctx.fillRect(
            this.position.x * this.gridSize + offset,
            this.position.y * this.gridSize + offset,
            size - 1,
            size - 1
        );
    }
    
    getPoints() {
        return this.currentType.points;
    }
}