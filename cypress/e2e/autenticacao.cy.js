
/// <reference types="cypress" />

const cadastro = require('../modules/cadastro')
const login = require('../modules/login')

describe('Automation Exercise - Autenticação', () => {

  const email = Cypress.env('email')
  const senha = Cypress.env('senha')
  const nome = Cypress.env('nome')

  it('Cadastrar um novo usuário com sucesso', () => {
    cy.visit('/login')

    const emailNovo = `pgats-aut-${Date.now()}@email.com`

    cadastro.iniciarCadastro('PGATS Aut', emailNovo)
    cadastro.preencherCadastro()
    cadastro.verificarCadastro()
  })

  it('Efetuar login com credenciais válidas', () => {
    cy.visit('/login')

    login.preencherLogin(email, senha)
    login.verificarLogin(nome)
  })

  it('Exibir erro com senha incorreta', () => {
    cy.visit('/login')

    login.preencherLogin(email, 'senha-incorreta-123')

    cy.get('form[action*="login"] p')
      .should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!')
  })

  it('Efetuar logout', () => {
    cy.visit('/login')

    login.preencherLogin(email, senha)
    login.verificarLogin(nome)

    cy.get('a[href="/logout"]')
      .click()

    cy.url().should('include', '/login')

    cy.get('.login-form > h2')
      .should('be.visible')

    cy.get('a[href="/logout"]')
      .should('not.exist')
  })

  it('Impedir cadastro com e-mail existente', () => {
    cy.visit('/login')

    cadastro.iniciarCadastro(nome, email)
    cadastro.verificarEmailExistente()
  })

})
