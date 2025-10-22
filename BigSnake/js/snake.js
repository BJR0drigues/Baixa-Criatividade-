class Snake {
    constructor(canvas, cellSize) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cellSize = cellSize;
        this.reset();
    }

    reset() {
        // Posição inicial no centro
        const centerX = Math.floor(this.canvas.width / this.cellSize / 2);
        const centerY = Math.floor(this.canvas.height / this.cellSize / 2);
        
        // Começa com 3 segmentos
        this.body = [
            { x: centerX, y: centerY },
            { x: centerX - 1, y: centerY },
            { x: centerX - 2, y: centerY }
        ];
        
        this.direction = "right";
        this.nextDirection = "right";
        this.colorIndex = 0; // Começando com vermelho
        this.growthPending = 0;
        this.confusion = false;
        this.confusionTimer = 0;
    }

    // Cores do arco-íris para o corpo da cobra
    getColorByIndex(index) {
        const colors = [
            "#ff0000", // Vermelho
            "#ff7700", // Laranja
            "#ffdd00", // Amarelo
            "#00cc00", // Verde
            "#0099ff", // Azul
            "#6633cc", // Anil
            "#cc00ff"  // Violeta
        ];
        return colors[index % colors.length];
    }

    // Atualiza a cor baseada no tamanho atual
    updateColor() {
        const maxColorIndex = 6; // 7 cores (0-6)
        this.colorIndex = Math.min(Math.floor(this.body.length / 5), maxColorIndex);
    }

    // Muda a direção
    setDirection(direction) {
        // Se estiver confuso, inverte os controles
        if (this.confusion) {
            if (direction === "up") direction = "down";
            else if (direction === "down") direction = "up";
            else if (direction === "left") direction = "right";
            else if (direction === "right") direction = "left";
        }
        
        // Evita que a cobra volte diretamente para trás
        if (this.direction === "up" && direction === "down") return;
        if (this.direction === "down" && direction === "up") return;
        if (this.direction === "left" && direction === "right") return;
        if (this.direction === "right" && direction === "left") return;
        
        this.nextDirection = direction;
    }

    // Move a cobra
    move() {
        // Atualiza a direção
        this.direction = this.nextDirection;

        // Atualiza o temporizador de confusão, se ativo
        if (this.confusion) {
            this.confusionTimer--;
            if (this.confusionTimer <= 0) {
                this.confusion = false;
            }
        }

        // Cria a nova cabeça baseada na direção
        const head = {...this.body[0]};
        
        switch (this.direction) {
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
            case "left":
                head.x--;
                break;
            case "right":
                head.x++;
                break;
        }
        
        // Adiciona a nova cabeça ao corpo
        this.body.unshift(head);
        
        // Se não houver crescimento pendente, remove o último segmento
        if (this.growthPending > 0) {
            this.growthPending--;
        } else {
            this.body.pop();
        }

        // Atualiza a cor com base no novo tamanho
        this.updateColor();
    }

    // Verifica colisão com as bordas
    checkBorderCollision() {
        const head = this.body[0];
        return (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= this.canvas.width / this.cellSize ||
            head.y >= this.canvas.height / this.cellSize
        );
    }

    // Verifica colisão com o próprio corpo
    checkSelfCollision() {
        const head = this.body[0];
        return this.body.slice(1).some(segment => 
            segment.x === head.x && segment.y === head.y
        );
    }

    // Verifica colisão com obstáculos
    checkObstacleCollision(obstacles) {
        if (!obstacles || obstacles.length === 0) return false;
        
        const head = this.body[0];
        return obstacles.some(obstacle => 
            head.x === obstacle.x && head.y === obstacle.y
        );
    }

    // Verifica se a cobra está comendo a comida
    checkFoodCollision(food) {
        const head = this.body[0];
        return head.x === food.position.x && head.y === food.position.y;
    }

    // Cresce a cobra
    grow(amount) {
        this.growthPending += amount;
    }

    // Encolhe a cobra (para comidas estragadas)
    shrink(amount) {
        // Não deixa a cobra ficar menor que 3 segmentos
        if (this.body.length > amount + 3) {
            this.body = this.body.slice(0, this.body.length - amount);
        }
    }

    // Ativa o efeito de confusão
    activateConfusion(duration) {
        this.confusion = true;
        this.confusionTimer = duration;
    }

    // Desenha a cobra
    draw() {
        this.body.forEach((segment, index) => {
            // Define a cor baseada na posição no corpo
            let segmentColor;
            if (index === 0) {
                // Cabeça: mais clara
                segmentColor = this.getColorByIndex(this.colorIndex);
            } else {
                // Corpo: alterna entre cores mais escuras
                const segmentColorIndex = Math.max(0, this.colorIndex - Math.floor(index / 3));
                segmentColor = this.getColorByIndex(segmentColorIndex);
            }
            
            this.ctx.fillStyle = segmentColor;
            
            // Desenha o segmento com borda arredondada
            this.ctx.fillRect(
                segment.x * this.cellSize,
                segment.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
            
            // Se for a cabeça, adiciona olhos
            if (index === 0) {
                this.ctx.fillStyle = "white";
                
                const eyeSize = this.cellSize / 5;
                const eyeOffset = this.cellSize / 4;
                
                // Posiciona os olhos com base na direção
                let eye1X, eye1Y, eye2X, eye2Y;
                
                switch (this.direction) {
                    case "right":
                        eye1X = segment.x * this.cellSize + this.cellSize - eyeOffset;
                        eye1Y = segment.y * this.cellSize + eyeOffset;
                        eye2X = segment.x * this.cellSize + this.cellSize - eyeOffset;
                        eye2Y = segment.y * this.cellSize + this.cellSize - eyeOffset * 2;
                        break;
                    case "left":
                        eye1X = segment.x * this.cellSize + eyeOffset - eyeSize;
                        eye1Y = segment.y * this.cellSize + eyeOffset;
                        eye2X = segment.x * this.cellSize + eyeOffset - eyeSize;
                        eye2Y = segment.y * this.cellSize + this.cellSize - eyeOffset * 2;
                        break;
                    case "up":
                        eye1X = segment.x * this.cellSize + eyeOffset;
                        eye1Y = segment.y * this.cellSize + eyeOffset - eyeSize;
                        eye2X = segment.x * this.cellSize + this.cellSize - eyeOffset * 2;
                        eye2Y = segment.y * this.cellSize + eyeOffset - eyeSize;
                        break;
                    case "down":
                        eye1X = segment.x * this.cellSize + eyeOffset;
                        eye1Y = segment.y * this.cellSize + this.cellSize - eyeOffset;
                        eye2X = segment.x * this.cellSize + this.cellSize - eyeOffset * 2;
                        eye2Y = segment.y * this.cellSize + this.cellSize - eyeOffset;
                        break;
                }
                
                this.ctx.fillRect(eye1X, eye1Y, eyeSize, eyeSize);
                this.ctx.fillRect(eye2X, eye2Y, eyeSize, eyeSize);
                
                // Adiciona pupilas pretas
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(eye1X + eyeSize/4, eye1Y + eyeSize/4, eyeSize/2, eyeSize/2);
                this.ctx.fillRect(eye2X + eyeSize/4, eye2Y + eyeSize/4, eyeSize/2, eyeSize/2);
            }
        });
        
        // Efeito visual quando está confuso
        if (this.confusion) {
            this.ctx.fillStyle = "rgba(255, 0, 255, 0.2)";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    // Retorna o tamanho atual da cobra
    getSize() {
        return this.body.length;
    }

    // Retorna a porcentagem de ocupação da cobra em relação ao tamanho da tela
    getSizePercentage() {
        const totalCells = (this.canvas.width / this.cellSize) * (this.canvas.height / this.cellSize);
        return (this.body.length / totalCells) * 100;
    }
}