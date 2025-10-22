class Snake {
    constructor() {
        this.segments = [{x: 10, y: 10}]; // Posição inicial da cobra
        this.direction = "right";
        this.nextDirection = "right";
        this.gridSize = 20; // Tamanho de cada segmento da cobra
        this.expandOnNextUpdate = false;
        this.colors = [
            "#00FF00", // Verde inicial
            "#00FFFF", // Ciano
            "#FF00FF", // Magenta
            "#FFFF00", // Amarelo
            "#FF5500", // Laranja
            "#FF0000"  // Vermelho
        ];
        this.headColor = this.colors[0];
        this.bodyColor = "#32CD32"; // Verde mais escuro para o corpo inicial
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
        
        // Atualiza a cor com base no tamanho da cobra
        this.updateColor();
    }
    
    updateColor() {
        // Calcula o índice de cor com base no tamanho da cobra
        const colorIndex = Math.min(
            Math.floor((this.segments.length - 1) / 5), 
            this.colors.length - 1
        );
        
        // Atualiza as cores
        this.headColor = this.colors[colorIndex];
        
        // Cria uma cor de corpo ligeiramente mais escura que a cabeça
        const headColorValue = parseInt(this.headColor.substring(1), 16);
        const r = ((headColorValue >> 16) & 255) * 0.8;
        const g = ((headColorValue >> 8) & 255) * 0.8;
        const b = (headColorValue & 255) * 0.8;
        this.bodyColor = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
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
                ctx.fillStyle = this.headColor;
            } else {
                ctx.fillStyle = this.bodyColor;
                
                // Efeito de "arco-íris" - cada segmento tem uma cor ligeiramente diferente
                if (index > 2) {
                    const hue = (Date.now() / 50 + index * 10) % 360;
                    ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
                }
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
    
    // Retorna o tamanho da cobra
    getSize() {
        return this.segments.length;
    }
}