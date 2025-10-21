# 🤝 Guia de Contribuição

Obrigado por contribuir para o nosso projeto de hackathon! Este documento contém as diretrizes para contribuir.

## 📋 Como Contribuir

### 1. Configuração do Ambiente

1. Faça um fork do repositório (se necessário)
2. Clone o repositório:
   ```bash
   git clone https://github.com/BJR0drigues/Baixa-Criatividade-.git
   cd Baixa-Criatividade-
   ```
3. Configure o repositório upstream (se aplicável):
   ```bash
   git remote add upstream https://github.com/BJR0drigues/Baixa-Criatividade-.git
   ```

### 2. Criando uma Branch

Sempre crie uma branch para suas alterações:

```bash
git checkout -b feature/nome-da-feature
```

Convenção de nomes:
- `feature/` - Para novas funcionalidades
- `fix/` - Para correções de bugs
- `docs/` - Para alterações na documentação
- `refactor/` - Para refatoração de código
- `test/` - Para adicionar ou modificar testes

### 3. Fazendo Commits

Use commits descritivos e objetivos:

```bash
git commit -m "feat: adiciona funcionalidade X"
git commit -m "fix: corrige bug em Y"
git commit -m "docs: atualiza README com instruções"
```

Convenção de mensagens de commit:
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação, ponto e vírgula faltando, etc
- `refactor:` - Refatoração de código
- `test:` - Adição ou modificação de testes
- `chore:` - Tarefas de manutenção

### 4. Enviando Mudanças

```bash
git push origin feature/nome-da-feature
```

### 5. Criando Pull Request

1. Vá para o repositório no GitHub
2. Clique em "Pull Request"
3. Descreva suas alterações claramente
4. Aguarde review da equipe

## 💻 Padrões de Código

### Geral
- Use nomes descritivos para variáveis e funções
- Comente código complexo
- Mantenha funções pequenas e focadas
- Evite código duplicado

### JavaScript/TypeScript
```javascript
// Use camelCase para variáveis e funções
const myVariable = 'value';
function myFunction() { }

// Use PascalCase para classes
class MyClass { }

// Use UPPER_CASE para constantes
const MAX_ITEMS = 100;
```

### Python
```python
# Use snake_case para variáveis e funções
my_variable = 'value'
def my_function():
    pass

# Use PascalCase para classes
class MyClass:
    pass

# Use UPPER_CASE para constantes
MAX_ITEMS = 100
```

## ✅ Checklist Antes de Fazer Push

- [ ] O código está funcionando?
- [ ] Você testou suas alterações?
- [ ] O código segue os padrões do projeto?
- [ ] Você atualizou a documentação se necessário?
- [ ] Seus commits têm mensagens claras?
- [ ] Você removeu código comentado ou de debug?

## 🔍 Code Review

Ao revisar código dos colegas:
- Seja construtivo e gentil
- Explique o porquê de suas sugestões
- Aprove quando estiver satisfeito
- Teste o código antes de aprovar mudanças críticas

## 🐛 Reportando Bugs

Ao reportar um bug, inclua:
1. Descrição clara do problema
2. Passos para reproduzir
3. Comportamento esperado vs atual
4. Screenshots (se aplicável)
5. Informações do ambiente (OS, navegador, etc)

## 💬 Dúvidas?

Se tiver dúvidas, não hesite em:
- Abrir uma issue
- Perguntar no grupo da equipe
- Falar com os líderes do projeto

---

**Obrigado por contribuir! 🎉**
