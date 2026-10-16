
/// <reference types="cypress" />

const produtos = require('../modules/produtos')

describe('Automation Exercise - Produtos', () => {

  it('Exibir a página de produtos', () => {
    cy.visit('/products')

    cy.url().should('include', '/products')

    cy.contains('h2', 'All Products')
      .should('be.visible')

    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0)

    cy.get('.features_items .product-image-wrapper')
      .first()
      .should('be.visible')
  })

  it('Pesquisar produto', () => {
    cy.visit('/products')

    produtos.pesquisarProduto('Blue Top')

    cy.contains('h2', 'Searched Products')
      .should('be.visible')

    cy.get('.features_items .productinfo')
      .should('have.length.greaterThan', 0)
      .each(($produto) => {
        cy.wrap($produto)
          .should('contain.text', 'Blue Top')
      })
  })

  it('Visualizar detalhes do produto', () => {
    cy.visit('/products')

    produtos.abrirDetalhesProduto(1)

    cy.url().should('include', '/product_details/1')

    cy.get('.product-information')
      .should('be.visible')

    cy.get('.product-information h2')
      .should('have.text', 'Blue Top')

    cy.get('.product-information')
      .should('contain.text', 'Category')
      .and('contain.text', 'Availability')
      .and('contain.text', 'Condition')
      .and('contain.text', 'Brand')

    cy.get('.product-information span span')
      .should('have.text', 'Rs. 500')
      
  })

})
