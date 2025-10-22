class Snake {
    constructor() {
        this.segments = [{x: 10, y: 10}]; // Posição inicial da cobra
        this.direction = "right";
        this.nextDirection = "right";
        this.gridSize = 20; // Tamanho de cada segmento da cobra
        this.expandOnNextUpdate = false;
    }

    update() {
        // Atualiza a direção
        this.direction = this.nextDirection;
        
        // Cria uma cópia da cabeça atual
        const head = {...this.segments[0]};
        
        // Move a cabeça conforme a direção
        switch (this.direction) {
            case "up":
                head.y -= 1;
                break;
            case "down":
                head.y += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "right":
                head.x += 1;
                break;
        }
        
        // Adiciona a nova cabeça ao início dos segmentos
        this.segments.unshift(head);
        
        // Se não estiver expandindo, remove o último segmento
        if (!this.expandOnNextUpdate) {
            this.segments.pop();
        } else {
            this.expandOnNextUpdate = false;
        }
    }
    
    draw(ctx) {
        if (!ctx) {
            console.error("Contexto não definido!");
            return;
        }
        
        // Desenha cada segmento da cobra
        this.segments.forEach((segment, index) => {
            // Cabeça com cor diferente
            if (index === 0) {
                ctx.fillStyle = "#00FF00"; // Verde para a cabeça
            } else {
                ctx.fillStyle = "#32CD32"; // Verde mais escuro para o corpo
            }
            
            ctx.fillRect(
                segment.x * this.gridSize, 
                segment.y * this.gridSize, 
                this.gridSize - 1, 
                this.gridSize - 1
            );
        });
    }
    
    changeDirection(newDirection) {
        this.nextDirection = newDirection;
    }
    
    checkFoodCollision(food) {
        const head = this.segments[0];
        return head.x === food.position.x && head.y === food.position.y;
    }
    
    grow() {
        this.expandOnNextUpdate = true;
    }
    
    checkCollision() {
        const head = this.segments[0];
        const canvas = document.getElementById('gameCanvas');
        
        if (!canvas) return false;
        
        // Colisão com as paredes
        const maxX = Math.floor(canvas.width / this.gridSize);
        const maxY = Math.floor(canvas.height / this.gridSize);
        
        if (head.x < 0 || head.x >= maxX || head.y < 0 || head.y >= maxY) {
            return true;
        }
        
        // Colisão consigo mesma
        for (let i = 1; i < this.segments.length; i++) {
            if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
                return true;
            }
        }
        
        return false;
    }
}