
function iniciarCadastro(nome, email) {
  cy.get('[data-qa="signup-name"]').type(nome)
  cy.get('[data-qa="signup-email"]').type(email)
  cy.get('[data-qa="signup-button"]').click()

  cy.url().should('include', '/signup')
}

function preencherCadastro() {
  cy.get('#id_gender1').check()

  cy.get('[data-qa="password"]')
    .type(Cypress.env('senhaCadastro'), { log: false })

  cy.get('[data-qa="days"]').select('1')
  cy.get('[data-qa="months"]').select('March')
  cy.get('[data-qa="years"]').select('1990')

  cy.get('[data-qa="first_name"]').type('PGATS1001')
  cy.get('[data-qa="last_name"]').type('2026')
  cy.get('[data-qa="company"]').type('POS')
  cy.get('[data-qa="address"]').type('Endereço 1001')
  cy.get('[data-qa="country"]').select('United States')
  cy.get('[data-qa="state"]').type('Illinois')
  cy.get('[data-qa="city"]').type('Chicago')
  cy.get('[data-qa="zipcode"]').type('12345')
  cy.get('[data-qa="mobile_number"]').type('99999999')

  cy.get('[data-qa="create-account"]').click()
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
