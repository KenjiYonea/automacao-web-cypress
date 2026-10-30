
/// <reference types="cypress" />
const cadastro = require('../modules/cadastro')
const checkout = require('../modules/checkout')
const carrinho = require('../modules/carrinho')
const login = require('../modules/login')

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

  it('Realizar compra com cadastro antes do checkout', () => {

    const usuario = {
      nome: 'QA Teste',
      email: `qa.checkout.${Date.now()}@email.com`,
      senha: 'Teste@12345',
      endereco: 'Rua Teste, 100',
      estado: 'California',
      cidade: 'Los Angeles',
      cep: '90001'
    }

    // Cadastrar usuário
    cy.visit('/login')

    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.preencherCadastro(usuario)
    cadastro.verificarCadastro()

    cy.contains('Logged in as')
      .should('contain.text', usuario.nome)

    // Adicionar produto
    carrinho.adicionarProduto()

    cy.get('#product-1')
      .should('be.visible')
      .and('contain.text', 'Blue Top')

    // Iniciar checkout
    cy.contains('Proceed To Checkout').click()

    cy.location('pathname')
      .should('eq', '/checkout')

    // Validar endereço de entrega
    cy.get('#address_delivery')
      .should('contain.text', usuario.endereco)
      .and('contain.text', usuario.cidade)
      .and('contain.text', usuario.estado)

    // Validar produto no pedido
    cy.get('#cart_info #product-1')
      .should('be.visible')
      .and('contain.text', 'Blue Top')

    // Finalizar pedido
    cy.get('textarea[name="message"]')
      .type('Pedido automatizado - Cypress')

    cy.contains('a', 'Place Order').click()

    cy.location('pathname')
      .should('eq', '/payment')

    checkout.preencherPagamento({
      nome: usuario.nome,
      numero: '4111111111111111',
      cvc: '123',
      mes: '12',
      ano: '2030'
    })

    cy.get('[data-qa="pay-button"]')
      .should('be.enabled')
      .click()

    checkout.validarPedidoConcluido()

    // Excluir conta criada pelo teste
    cy.get('a[href="/delete_account"]').click()

    cy.get('[data-qa="account-deleted"]')
      .should('be.visible')
      .and('contain.text', 'Account Deleted!')

    cy.get('[data-qa="continue-button"]').click()
  })

  it('Realizar compra com login antes do checkout', () => {

    const usuario = {
      nome: 'QA Checkout',
      email: `qa.login.checkout.${Date.now()}@email.com`,
      senha: 'Teste@12345',
      endereco: 'Rua Teste, 100',
      estado: 'California',
      cidade: 'Los Angeles',
      cep: '90001'
    }

    // Preparar uma conta exclusiva para o teste
    cy.visit('/login')

    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.preencherCadastro(usuario)
    cadastro.verificarCadastro()

    cy.contains('Logged in as')
      .should('contain.text', usuario.nome)

    // Encerrar a sessão
    cy.get('a[href="/logout"]')
      .should('be.visible')
      .click()

    cy.location('pathname')
      .should('eq', '/login')

    // Realizar login com a conta criada
    login.preencherLogin(usuario.email, usuario.senha)
    login.verificarLogin(usuario.nome)

    // Preparar o carrinho
    carrinho.adicionarProduto()

    cy.get('#product-1')
      .should('be.visible')
      .and('contain.text', 'Blue Top')

    // Iniciar checkout
    cy.contains('Proceed To Checkout')
      .should('be.visible')
      .click()

    cy.location('pathname')
      .should('eq', '/checkout')

    // Validar endereço de entrega
    cy.get('#address_delivery')
      .should('be.visible')
      .and('contain.text', usuario.endereco)
      .and('contain.text', usuario.cidade)
      .and('contain.text', usuario.estado)

    // Validar produto no resumo do pedido
    cy.get('#cart_info #product-1')
      .should('be.visible')
      .and('contain.text', 'Blue Top')

    // Finalizar pedido
    cy.get('textarea[name="message"]')
      .type('Pedido automatizado - Cypress')

    cy.contains('a', 'Place Order')
      .should('be.visible')
      .click()

    cy.location('pathname')
      .should('eq', '/payment')

    // Preencher pagamento de teste
    checkout.preencherPagamento({
      nome: usuario.nome,
      numero: '4111111111111111',
      cvc: '123',
      mes: '12',
      ano: '2030'
    })

    cy.get('[data-qa="pay-button"]')
      .should('be.visible')
      .and('be.enabled')
      .click()

    // Validar conclusão da compra
    checkout.validarPedidoConcluido()

    // Excluir a conta criada
    cy.get('a[href="/delete_account"]')
      .should('be.visible')
      .click()

    cy.get('[data-qa="account-deleted"]')
      .should('be.visible')
      .and('contain.text', 'Account Deleted!')

    cy.get('[data-qa="continue-button"]')
      .click()

    cy.location('pathname')
      .should('eq', '/')
  })

})
