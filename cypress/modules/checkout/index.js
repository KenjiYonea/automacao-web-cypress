function preencherPagamento(dadosPagamento) {
  cy.get('[data-qa="name-on-card"]')
    .type(dadosPagamento.nome)

  cy.get('[data-qa="card-number"]')
    .type(dadosPagamento.numero, { log: false })

  cy.get('[data-qa="cvc"]')
    .type(dadosPagamento.cvc, { log: false })

  cy.get('[data-qa="expiry-month"]')
    .type(dadosPagamento.mes)

  cy.get('[data-qa="expiry-year"]')
    .type(dadosPagamento.ano)
}

function validarPedidoConcluido() {
  cy.location('pathname', { timeout: 15000 })
    .should('include', '/payment_done/')

  cy.contains('Order Placed!', { matchCase: false })
    .should('be.visible')

  cy.contains('Congratulations! Your order has been confirmed!')
    .should('be.visible')
}

module.exports = {
  preencherPagamento,
  validarPedidoConcluido
}