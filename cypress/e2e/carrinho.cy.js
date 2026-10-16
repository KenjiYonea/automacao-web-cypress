
/// <reference types="cypress" />

const carrinho = require('../modules/carrinho')

describe('Automation Exercise - Carrinho', () => {

  it('Adicionar produto ao carrinho', () => {
    carrinho.adicionarProduto()

    cy.url().should('include', '/view_cart')

    cy.get('#product-1')
      .should('be.visible')
      .and('contain.text', 'Blue Top')
  })

  it('Remover produto do carrinho', () => {
    carrinho.adicionarProduto()

    cy.get('#product-1')
      .should('be.visible')

    cy.get('#product-1 .cart_quantity_delete')
      .click()

    cy.get('#product-1')
      .should('not.exist')

    cy.contains('Cart is empty!')
      .should('be.visible')
  })

  it('Validar preços e totais de dois produtos no carrinho', () => {
    cy.visit('/products')

    // Adicionar primeiro produto com quantidade 2
    cy.get('a[href="/product_details/1"]')
      .first()
      .click()

    cy.get('#quantity')
      .clear()
      .type('2')

    cy.get('button.cart').click()
    cy.contains('Continue Shopping').click()

    // Adicionar segundo produto
    cy.visit('/products')

    cy.get('a[href="/product_details/2"]')
      .first()
      .click()

    cy.get('button.cart').click()
    cy.contains('View Cart').click()

    // Validar presença dos produtos
    cy.get('#product-1').should('be.visible')
    cy.get('#product-2').should('be.visible')

    // Validar quantidade e total de cada produto
    const produtos = [
      { id: 1, quantidade: 2 },
      { id: 2, quantidade: 1 }
    ]

    produtos.forEach(({ id, quantidade }) => {

      cy.get(`#product-${id}`).within(() => {

        cy.get('.cart_quantity')
          .should('contain.text', quantidade)

        cy.get('.cart_price').invoke('text').then((precoTexto) => {
          cy.get('.cart_total').invoke('text').then((totalTexto) => {

            const converterValor = (texto) =>
              Number(texto.replace(/[^\d]/g, ''))

            const preco = converterValor(precoTexto)
            const total = converterValor(totalTexto)
            const totalEsperado = preco * quantidade

            cy.log(`Produto ${id}`)
            cy.log(`Preço unitário: ${preco}`)
            cy.log(`Quantidade: ${quantidade}`)
            cy.log(`Total esperado: ${totalEsperado}`)
            cy.log(`Total exibido: ${total}`)

            expect(total).to.equal(totalEsperado)

          })
        })
      })
    })
  })

  it('Manter produto no carrinho após realizar login', () => {
    cy.visit('/products')

    // Adicionar produto sem autenticação
    cy.get('a[href="/product_details/1"]')
      .first()
      .click()

    cy.get('button.cart').click()
    cy.contains('View Cart').click()

    // Validar produto antes do login
    cy.get('#product-1')
      .should('be.visible')
      .and('contain.text', 'Blue Top')

    // Realizar login
    cy.get('a[href="/login"]')
      .first()
      .click()

    cy.get('[data-qa="login-email"]')
      .type(Cypress.env('email'))

    cy.get('[data-qa="login-password"]')
      .type(Cypress.env('senha'), { log: false })

    cy.get('[data-qa="login-button"]')
      .click()

    cy.contains('Logged in as')
      .should('be.visible')

    // Validar persistência após autenticação
    cy.get('a[href="/view_cart"]')
      .first()
      .click()

    cy.get('#product-1')
      .should('be.visible')
      .and('contain.text', 'Blue Top')
  })

})
