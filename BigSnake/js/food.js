class Food {
    constructor(canvas, cellSize, type = "good") {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cellSize = cellSize;
        this.position = { x: 0, y: 0 };
        this.type = type; // "good" ou "bad"
        this.foodItems = {
            good: [
                { name: "brigadeiro", value: 10, growth: 1, color: "#4b2b23", shape: "circle" },
                { name: "sanduiche", value: 15, growth: 2, color: "#ddaa44", shape: "rect" },
                { name: "pizza", value: 20, growth: 3, color: "#cc5544", shape: "triangle" },
                { name: "milkshake", value: 25, growth: 4, color: "#ffaacc", shape: "bottle" },
                { name: "sorvete", value: 30, growth: 5, color: "#aaeeff", shape: "cone" }
            ],
            bad: [
                { name: "brigadeiro_mofado", value: -10, growth: -1, color: "#2b4b23", shape: "circle", effect: "shrink" },
                { name: "sanduiche_estragado", value: -15, growth: -2, color: "#aa7744", shape: "rect", effect: "shrink" },
                { name: "pizza_fungos", value: -20, growth: 0, color: "#557744", shape: "triangle", effect: "confusion" }
            ]
        };
        this.currentFood = this.getRandomFood();
    }

    getRandomFood() {
        const foods = this.foodItems[this.type];
        return foods[Math.floor(Math.random() * foods.length)];
    }

    setType(type) {
        if (type === "good" || type === "bad") {
            this.type = type;
            this.currentFood = this.getRandomFood();
        }
    }

    // Posiciona a comida em um local livre
    place(snake, obstacles = []) {
        let valid = false;
        let position;

        while (!valid) {
            position = {
                x: Math.floor(Math.random() * (this.canvas.width / this.cellSize)),
                y: Math.floor(Math.random() * (this.canvas.height / this.cellSize))
            };

            // Verifica se a posição não está ocupada pela cobra
            valid = !snake.body.some(segment => 
                segment.x === position.x && segment.y === position.y
            );

            // Verifica se a posição não está ocupada por obstáculos
            if (valid && obstacles.length > 0) {
                valid = !obstacles.some(obstacle => 
                    obstacle.x === position.x && obstacle.y === position.y
                );
            }
        }

        this.position = position;
        this.currentFood = this.getRandomFood();
    }

    // Desenha a comida
    draw() {
        const x = this.position.x * this.cellSize;
        const y = this.position.y * this.cellSize;
        const size = this.cellSize;
        
        this.ctx.fillStyle = this.currentFood.color;

        switch (this.currentFood.shape) {
            case "circle": // Brigadeiro
                this.ctx.beginPath();
                this.ctx.arc(
                    x + size/2,
                    y + size/2,
                    size/2,
                    0,
                    Math.PI * 2
                );
                this.ctx.fill();
                
                // Granulado para o brigadeiro
                if (this.type === "good") {
                    this.ctx.fillStyle = "#000000";
                    for (let i = 0; i < 5; i++) {
                        this.ctx.fillRect(
                            x + Math.random() * size,
                            y + Math.random() * size,
                            2,
                            2
                        );
                    }
                } else {
                    // Bolor para brigadeiro mofado
                    this.ctx.fillStyle = "#88ff88";
                    for (let i = 0; i < 5; i++) {
                        this.ctx.fillRect(
                            x + Math.random() * size,
                            y + Math.random() * size,
                            3,
                            3
                        );
                    }
                }
                break;

            case "rect": // Sanduíche
                this.ctx.fillRect(x, y, size, size);
                
                // Detalhes do sanduíche
                if (this.type === "good") {
                    // Camadas do sanduíche
                    this.ctx.fillStyle = "#aa8844"; // Pão
                    this.ctx.fillRect(x, y, size, size/4);
                    this.ctx.fillStyle = "#44cc44"; // Alface
                    this.ctx.fillRect(x, y + size/4, size, size/4);
                    this.ctx.fillStyle = "#dd5555"; // Tomate/Carne
                    this.ctx.fillRect(x, y + size/2, size, size/4);
                    this.ctx.fillStyle = "#aa8844"; // Pão
                    this.ctx.fillRect(x, y + size*3/4, size, size/4);
                } else {
                    // Sanduíche estragado
                    this.ctx.fillStyle = "#556644"; // Bolor
                    this.ctx.fillRect(x + size/4, y + size/4, size/2, size/2);
                }
                break;

            case "triangle": // Pizza
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + size);
                this.ctx.lineTo(x + size/2, y);
                this.ctx.lineTo(x + size, y + size);
                this.ctx.closePath();
                this.ctx.fill();
                
                // Detalhes da pizza
                if (this.type === "good") {
                    // Queijo
                    this.ctx.fillStyle = "#ffdd44";
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + size*0.2, y + size*0.8);
                    this.ctx.lineTo(x + size/2, y + size*0.3);
                    this.ctx.lineTo(x + size*0.8, y + size*0.8);
                    this.ctx.closePath();
                    this.ctx.fill();
                    
                    // Pepperoni
                    this.ctx.fillStyle = "#cc3333";
                    this.ctx.beginPath();
                    this.ctx.arc(x + size/2, y + size*0.6, size/6, 0, Math.PI * 2);
                    this.ctx.fill();
                } else {
                    // Pizza com fungos
                    this.ctx.fillStyle = "#66aa66";
                    for (let i = 0; i < 3; i++) {
                        this.ctx.beginPath();
                        this.ctx.arc(
                            x + size/4 + (size/2) * Math.random(),
                            y + size/2 + (size/2) * Math.random(),
                            size/8,
                            0,
                            Math.PI * 2
                        );
                        this.ctx.fill();
                    }
                }
                break;

            case "bottle": // Milk-shake
                // Corpo do copo
                this.ctx.fillRect(x + size/4, y + size/3, size/2, size*2/3);
                
                // Parte superior do milk-shake
                this.ctx.fillStyle = "#ffffff";
                this.ctx.beginPath();
                this.ctx.arc(
                    x + size/2,
                    y + size/3,
                    size/4,
                    0,
                    Math.PI * 2
                );
                this.ctx.fill();
                
                // Canudo
                this.ctx.fillStyle = "#ff5555";
                this.ctx.fillRect(x + size*0.7, y, size/10, size/2);
                break;

            case "cone": // Sorvete
                // Cone
                this.ctx.fillStyle = "#ddaa66";
                this.ctx.beginPath();
                this.ctx.moveTo(x + size/4, y + size);
                this.ctx.lineTo(x + size/2, y + size/2);
                this.ctx.lineTo(x + size*3/4, y + size);
                this.ctx.closePath();
                this.ctx.fill();
                
                // Bolas de sorvete
                this.ctx.fillStyle = this.currentFood.color;
                this.ctx.beginPath();
                this.ctx.arc(
                    x + size/2,
                    y + size/3,
                    size/3,
                    0,
                    Math.PI * 2
                );
                this.ctx.fill();
                
                // Calda
                this.ctx.fillStyle = "#cc3355";
                this.ctx.beginPath();
                this.ctx.moveTo(x + size/2, y);
                this.ctx.lineTo(x + size*0.7, y + size/4);
                this.ctx.lineTo(x + size*0.3, y + size/3);
                this.ctx.closePath();
                this.ctx.fill();
                break;
        }

        // Adiciona efeito piscante para comidas ruins
        if (this.type === "bad") {
            if (Math.random() > 0.7) {
                this.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
                this.ctx.fillRect(x, y, size, size);
            }
        }
    }

    // Retorna informações da comida atual
    getInfo() {
        return {
            value: this.currentFood.value,
            growth: this.currentFood.growth,
            effect: this.currentFood.effect || null
        };
    }
}