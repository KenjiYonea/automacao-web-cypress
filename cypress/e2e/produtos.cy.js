/// <reference types="cypress" />

describe('Automation Exercise - Produtos', () => {

    it('Deve acessar a página de produtos', () => {
        cy.visit('https://www.automationexercise.com/products')

        cy.url().should('include', '/products')

        cy.contains('h2', 'All Products')
            .should('be.visible')

        cy.get('.features_items .product-image-wrapper')
            .should('have.length.greaterThan', 0)
    });

    it('Pesquisar um produto com sucesso', () => {
        cy.visit('https://www.automationexercise.com/products')

        cy.get('#search_product').type('Blue Top')

        cy.get('#submit_search').click()

        cy.contains('h2', 'Searched Products')
            .should('be.visible')

        cy.get('.features_items .productinfo')
            .should('contain.text', 'Blue Top')
    });

    it('Visualizar os detalhes de um produto', () => {
        cy.visit('https://www.automationexercise.com/products')

        cy.get('a[href="/product_details/1"]')
            .first()
            .click()

        cy.url().should('include', '/product_details/1')

        cy.get('.product-information')
            .should('be.visible')

        cy.get('.product-information h2')
            .should('contain.text', 'Blue Top')

        cy.get('.product-information')
            .should('contain.text', 'Category')
            .and('contain.text', 'Availability')
            .and('contain.text', 'Condition')
            .and('contain.text', 'Brand')
    });
})