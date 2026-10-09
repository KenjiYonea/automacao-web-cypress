# Automação de Testes Web com Cypress

Projeto de automação de testes E2E (End-to-End) desenvolvido com **Cypress e JavaScript**, utilizando o site [Automation Exercise](https://www.automationexercise.com/) como aplicação de testes.

O objetivo é praticar a automação de funcionalidades web, aplicando validações de comportamento, organização dos cenários e execução automatizada por integração contínua.

## Tecnologias utilizadas

- JavaScript
- Cypress 13.7.3
- Node.js
- Git e GitHub
- GitHub Actions

## Cenários automatizados

Os testes estão organizados por funcionalidade, facilitando a manutenção e a execução independente.

### Autenticação — 5 testes

- Cadastro de usuário com sucesso
- Login com credenciais válidas
- Login com credenciais inválidas
- Logout do usuário
- Tentativa de cadastro com e-mail já existente

### Produtos — 3 testes

- Validar a exibição da página de produtos
- Pesquisar um produto com sucesso
- Visualizar os detalhes de um produto

### Carrinho — 2 testes

- Adicionar um produto ao carrinho
- Remover um produto do carrinho

**Total: 10 cenários automatizados.**

## Estrutura do projeto

```text
automacao-web/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress/
│   ├── e2e/
│   │   ├── autenticacao.cy.js
│   │   ├── produtos.cy.js
│   │   └── carrinho.cy.js
│   ├── fixtures/
│   └── support/
├── cypress.config.js
├── package.json
└── README.md
```

## Como executar o projeto

**Pré-requisitos:** Node.js e npm instalados.

**1. Clonar o repositório**

```bash
git clone https://github.com/KenjiYonea/automacao-web-cypress.git
```

**2. Acessar a pasta**

```bash
cd automacao-web-cypress
```

**3. Instalar as dependências**

```bash
npm install
```

**4. Executar o Cypress em modo interativo**

```bash
npx cypress open
```

**5. Executar todos os testes em modo headless**

```bash
npx cypress run
```

Para executar apenas uma funcionalidade:

```bash
npx cypress run --spec "cypress/e2e/produtos.cy.js"
```

## Integração contínua

O projeto utiliza **GitHub Actions** para executar os testes automaticamente a cada push ou pull request na branch `main`.

O workflow realiza o checkout do repositório, instala as dependências necessárias e executa a suíte Cypress no navegador Electron.

Os resultados podem ser acompanhados pela aba **Actions** do repositório.

## Resultado da execução local

Na última execução completa, os 10 testes foram aprovados:

| Funcionalidade | Testes aprovados |
|---|---:|
| Autenticação | 5/5 |
| Produtos | 3/3 |
| Carrinho | 2/2 |
| **Total** | **10/10** |

Tempo da execução local: aproximadamente 52 segundos.

Os resultados podem variar conforme o ambiente e a disponibilidade da aplicação.

## Considerações

Este projeto faz parte dos meus estudos e da prática de automação de testes web.

Durante o desenvolvimento, foram trabalhados conceitos como seletores CSS, interação com elementos, assertions, organização dos testes por funcionalidade e execução em pipeline CI.

A aplicação utilizada é pública e destinada à prática de automação de testes.

## Autor

**Bruno Kenji Nishioka Yonea**

[GitHub](https://github.com/KenjiYonea)
