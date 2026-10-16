
function preencherLogin(email, senha) {
  cy.get('[data-qa="login-email"]').type(email)

  cy.get('[data-qa="login-password"]')
    .type(senha, { log: false })

  cy.get('[data-qa="login-button"]').click()
}

function verificarLogin(nome) {
  cy.contains('.shop-menu a', 'Logged in as')
    .should('be.visible')
    .and('contain.text', nome)
}

module.exports = { preencherLogin, verificarLogin }
