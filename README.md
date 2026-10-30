Automação de Testes Web com Cypress
Projeto de automação de testes End-to-End (E2E) desenvolvido com Cypress e JavaScript, utilizando o site Automation Exercise como aplicação de testes.

O objetivo é exercitar a validação de fluxos de um e-commerce, com cenários funcionais, organização modular, execução automatizada em CI/CD e geração de relatórios para análise dos resultados.
Tecnologias utilizadas
- JavaScript e Node.js
- Cypress 13.7.3
- Mochawesome, Mochawesome Merge e Mochawesome Report Generator
- Git e GitHub
- GitHub Actions
Cobertura de testes
A suíte contém 15 cenários E2E, distribuídos em quatro arquivos de especificação.
Autenticação — 5 testes
- Cadastrar um novo usuário com sucesso
- Efetuar login com credenciais válidas
- Exibir erro ao informar senha incorreta
- Efetuar logout
- Impedir cadastro com e-mail já existente
Produtos — 3 testes
- Exibir a página de produtos
- Pesquisar um produto
- Visualizar os detalhes de um produto
Carrinho e checkout — 6 testes
- Adicionar produto ao carrinho
- Remover produto do carrinho
- Validar preços e totais de dois produtos no carrinho
- Manter produto no carrinho após realizar login
- Realizar compra com cadastro antes do checkout
- Realizar compra com login antes do checkout
Newsletter — 1 teste
- Realizar inscrição na newsletter com sucesso
Total: 15 cenários automatizados.
Estrutura do projeto
automacao-web-cypress/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress/
│   ├── e2e/
│   │   ├── autenticacao.cy.js
│   │   ├── carrinho.cy.js
│   │   ├── inscricaoNewsletter.cy.js
│   │   └── produtos.cy.js
│   ├── fixtures/
│   │   └── usuarios.json
│   ├── modules/
│   │   ├── cadastro/
│   │   ├── carrinho/
│   │   ├── checkout/
│   │   ├── login/
│   │   └── produtos/
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md
As especificações ficam em cypress/e2e/, enquanto ações reutilizáveis estão organizadas em cypress/modules/. Essa separação facilita a leitura dos cenários e a manutenção dos testes.
Como executar o projeto
Pré-requisitos: Node.js e npm instalados.

1. Clonar o repositório
git clone https://github.com/KenjiYonea/automacao-web-cypress.git
cd automacao-web-cypress
2. Instalar as dependências
npm ci
3. Configurar os dados de teste

Os testes de autenticação utilizam variáveis do Cypress. Configure os valores correspondentes a email, senha, nome e senhaCadastro em seu ambiente local. O arquivo cypress.env.json, caso utilizado, está no .gitignore e não deve ser versionado.

Exemplo de estrutura, com valores fictícios:
{
  "email": "usuario.teste@example.com",
  "senha": "SENHA_DE_TESTE",
  "nome": "Usuario Teste",
  "senhaCadastro": "SENHA_PARA_CADASTRO"
}
4. Executar os testes

Modo interativo:
npm run cy:open
Todos os testes em modo headless:
npm test
Executar uma especificação:
npx cypress run --spec "cypress/e2e/produtos.cy.js"
5. Gerar o relatório local
npm run test:report
Esse comando limpa relatórios anteriores, executa a suíte, consolida os arquivos JSON e gera o HTML em:
cypress/reports/html/relatorio-final.html
Observação: o comando test:report utiliza execução encadeada. Se houver falha nos testes, a geração do relatório local poderá ser interrompida. No GitHub Actions, a publicação dos relatórios é tentada mesmo após falhas.
Integração contínua (CI/CD)
O workflow [Cypress E2E Tests](.github/workflows/cypress.yml) é acionado em:
- Push na branch main
- Pull Requests direcionados à branch main
O pipeline executa a suíte no navegador Electron, consolida os resultados do Mochawesome, gera o relatório HTML e publica os arquivos como artefato relatorio-cypress.

Em caso de falhas, o workflow também tenta disponibilizar screenshots para investigação.

Para consultar os resultados, acesse a aba Actions, selecione uma execução e procure a seção Artifacts.
Resultado da execução em CI
Na execução registrada em 30/10/2026, o relatório Mochawesome apresentou:
Funcionalidade	Testes aprovados
Autenticação	5/5
Produtos	3/3
Carrinho e checkout	6/6
Newsletter	1/1
Total	15/15 (100%)


Falhas: 0. Testes ignorados: 0.

Esse resultado corresponde à execução indicada e não garante que execuções futuras terão o mesmo resultado.
Considerações
O projeto foi desenvolvido para estudo e prática de automação de testes web. Os cenários abordam fluxos de autenticação, catálogo, carrinho, checkout e inscrição em newsletter, com validações de comportamento e regras de negócio.

A aplicação utilizada é pública e voltada à prática de automação de testes.

## Autor

**Bruno Kenji Nishioka Yonea**

[GitHub](https://github.com/KenjiYonea)
