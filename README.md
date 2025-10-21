# 🎮 Baixa Criatividade - Jogos 2D Web

Bem-vindo ao repositório de desenvolvimento de jogos 2D para web! Este projeto demonstra como criar jogos simples e interativos usando HTML5, CSS3 e JavaScript puro.

## 🚀 Demonstração

Este repositório contém um jogo 2D de plataforma básico que demonstra:
- Loop de jogo principal
- Física simples (gravidade e pulo)
- Detecção de colisões
- Sistema de pontuação
- Controles responsivos

## 🎯 Características

- ✅ **100% JavaScript Puro** - Sem dependências externas
- ✅ **HTML5 Canvas** - Renderização gráfica eficiente
- ✅ **Design Responsivo** - Funciona em diferentes tamanhos de tela
- ✅ **Controles Intuitivos** - Setas do teclado e espaço para pular
- ✅ **Sistema de Pontuação** - Acompanhe seu progresso

## 🕹️ Como Jogar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/BJR0drigues/Baixa-Criatividade-.git
   cd Baixa-Criatividade-
   ```

2. **Abra o jogo:**
   - Abra o arquivo `index.html` no seu navegador
   - Ou use um servidor local (recomendado):
     ```bash
     # Com Python 3
     python -m http.server 8000
     
     # Com Node.js e http-server
     npx http-server
     ```

3. **Controles:**
   - **←** e **→** - Mover o jogador
   - **ESPAÇO** - Pular
   - Botões na tela para Iniciar, Pausar e Reiniciar

## 📁 Estrutura do Projeto

```
Baixa-Criatividade-/
├── index.html          # Estrutura HTML do jogo
├── style.css           # Estilos e design responsivo
├── game.js             # Lógica do jogo e engine
├── README.md           # Documentação (este arquivo)
└── .gitignore          # Arquivos ignorados pelo Git
```

## 🛠️ Tecnologias Utilizadas

- **HTML5 Canvas** - Para renderização gráfica 2D
- **CSS3** - Para estilização e layout responsivo
- **JavaScript ES6+** - Para lógica do jogo

## 📚 Aprendendo com Este Projeto

Este projeto é ideal para aprender:

### 1. **Game Loop**
O loop principal do jogo usando `requestAnimationFrame()`:
```javascript
function gameLoop() {
    updatePlayer();
    updateObstacles();
    checkCollisions();
    draw();
    requestAnimationFrame(gameLoop);
}
```

### 2. **Física Simples**
Implementação de gravidade e movimento:
```javascript
player.velocityY += player.gravity;
player.y += player.velocityY;
```

### 3. **Detecção de Colisões**
Algoritmo de detecção de colisão AABB (Axis-Aligned Bounding Box):
```javascript
if (player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y) {
    // Colisão detectada!
}
```

### 4. **Event Handling**
Captura de entrada do teclado:
```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
});
```

## 🎨 Personalizando o Jogo

Você pode facilmente modificar o jogo editando as variáveis no `game.js`:

```javascript
// Propriedades do jogador
const player = {
    speed: 5,           // Velocidade de movimento
    jumpPower: 12,      // Força do pulo
    color: '#4caf50'    // Cor do jogador
};

// Dificuldade
let obstacleSpeed = 3;  // Velocidade dos obstáculos
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abrir um Pull Request

## 📝 Ideias para Expansão

- [ ] Adicionar sprites e animações
- [ ] Implementar múltiplos níveis
- [ ] Adicionar efeitos sonoros
- [ ] Sistema de power-ups
- [ ] Salvar high scores no localStorage
- [ ] Adicionar modo multiplayer
- [ ] Implementar diferentes tipos de inimigos
- [ ] Adicionar menu principal

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🔗 Recursos Úteis

- [MDN - Canvas API](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API)
- [MDN - Game Development](https://developer.mozilla.org/pt-BR/docs/Games)
- [HTML5 Game Development](https://www.html5gamedevs.com/)
- [JavaScript Game Development](https://eloquentjavascript.net/)

## 👨‍💻 Autor

Desenvolvido como um projeto educacional para demonstrar conceitos de desenvolvimento de jogos 2D web.

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!