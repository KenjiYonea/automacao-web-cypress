
describe('Automation Exercise - Carrinho', () => {

    it('Adicionar um produto ao carrinho com sucesso', () => {
        cy.visit('https://www.automationexercise.com/products')

        cy.get('a[href="/product_details/1"]')
            .first()
            .click()

        cy.get('.product-information h2')
            .should('contain.text', 'Blue Top')

        cy.get('button.cart').click()

        cy.contains('Added!')
            .should('be.visible')

        cy.contains('View Cart').click()

        cy.url().should('include', '/view_cart')

        cy.get('#product-1')
            .should('be.visible')
            .and('contain.text', 'Blue Top')
    })

    it('Remover um produto do carrinho com sucesso', () => {
        cy.visit('https://www.automationexercise.com/products')

        cy.get('a[href="/product_details/1"]')
            .first()
            .click()

        cy.get('button.cart').click()

        cy.contains('View Cart').click()

        cy.get('#product-1')
            .should('be.visible')

        cy.get('#product-1 .cart_quantity_delete')
            .click()

        cy.get('#product-1')
            .should('not.exist')

        cy.contains('Cart is empty!')
            .should('be.visible')
    })

})
