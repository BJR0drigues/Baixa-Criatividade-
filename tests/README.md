# Testes

Este diretório contém todos os testes do projeto.

## 📁 Estrutura

```
tests/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
├── e2e/           # Testes end-to-end
└── fixtures/      # Dados de teste
```

## 🧪 Executando Testes

### Todos os testes
```bash
npm test
```

### Testes unitários
```bash
npm run test:unit
```

### Testes de integração
```bash
npm run test:integration
```

### Testes E2E
```bash
npm run test:e2e
```

### Com coverage
```bash
npm run test:coverage
```

## ✍️ Escrevendo Testes

### Exemplo de Teste Unitário

```javascript
describe('Nome do componente/função', () => {
  it('should do something', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

## 📊 Coverage

Objetivo: Manter coverage acima de 80%

## 🎯 Boas Práticas

- Teste um comportamento por vez
- Use nomes descritivos
- Siga o padrão AAA (Arrange, Act, Assert)
- Teste casos extremos
- Mantenha testes independentes

---

**Responsáveis pelos testes**: [Nomes]
