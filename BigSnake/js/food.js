class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.gridSize = 20;
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
    }
    
    draw(ctx) {
        if (!ctx) {
            console.error("Contexto não definido para desenhar comida!");
            return;
        }
        
        ctx.fillStyle = "#FF0000"; // Vermelho para a comida
        ctx.fillRect(
            this.position.x * this.gridSize,
            this.position.y * this.gridSize,
            this.gridSize - 1,
            this.gridSize - 1
        );
    }
}