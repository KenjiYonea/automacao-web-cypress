
function iniciarCadastro(nome, email) {
  cy.get('[data-qa="signup-name"]').type(nome)
  cy.get('[data-qa="signup-email"]').type(email)
  cy.get('[data-qa="signup-button"]').click()

  cy.url().should('include', '/signup')
}

function preencherCadastro(usuario = {}) {
  cy.get('#id_gender1').check()

  const senha = usuario.senha || Cypress.env('senhaCadastro')

  cy.get('[data-qa="password"]')
    .type(senha, { log: false })

  cy.get('[data-qa="days"]').select('1')
  cy.get('[data-qa="months"]').select('March')
  cy.get('[data-qa="years"]').select('1990')

  cy.get('[data-qa="first_name"]')
    .type(usuario.nome || 'PGATS1001')

  cy.get('[data-qa="last_name"]')
    .type(usuario.sobrenome || '2026')

  cy.get('[data-qa="company"]')
    .type(usuario.empresa || 'POS')

  cy.get('[data-qa="address"]')
    .type(usuario.endereco || 'Endereço 1001')

  cy.get('[data-qa="country"]')
    .select('United States')

  cy.get('[data-qa="state"]')
    .type(usuario.estado || 'Illinois')

  cy.get('[data-qa="city"]')
    .type(usuario.cidade || 'Chicago')

  cy.get('[data-qa="zipcode"]')
    .type(usuario.cep || '12345')

  cy.get('[data-qa="mobile_number"]')
    .type('9999999999')

  cy.get('[data-qa="create-account"]')
    .click()
}

function verificarCadastro() {
  cy.get('[data-qa="account-created"]')
    .should('be.visible')
    .and('contain.text', 'Account Created!')

  cy.get('[data-qa="continue-button"]').click()

  cy.contains('.shop-menu a', 'Logged in as')
    .should('be.visible')
}

function verificarEmailExistente() {
  cy.get('form[action*="signup"] p')
    .should('be.visible')
    .and('contain.text', 'Email Address already exist!')
}

module.exports = {
  iniciarCadastro,
  preencherCadastro,
  verificarCadastro,
  verificarEmailExistente
}
