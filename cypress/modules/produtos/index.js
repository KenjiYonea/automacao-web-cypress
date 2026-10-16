
function pesquisarProduto(nome) {
  cy.get('#search_product').type(nome)
  cy.get('#submit_search').click()
}

function abrirDetalhesProduto(id = 1) {
  cy.get(`a[href="/product_details/${id}"]`)
    .first()
    .click()
}

module.exports = {
  pesquisarProduto,
  abrirDetalhesProduto
}
