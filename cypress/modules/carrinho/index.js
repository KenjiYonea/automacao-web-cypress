const { abrirDetalhesProduto } = require('../produtos')

function adicionarProduto() {
  cy.visit('/products')
  abrirDetalhesProduto()
  cy.get('button.cart').click()
  cy.contains('Added!').should('be.visible')
  cy.contains('View Cart').click()
}

module.exports = { adicionarProduto }
