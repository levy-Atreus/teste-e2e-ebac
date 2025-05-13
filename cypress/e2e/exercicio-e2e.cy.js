import produtosPage from "../support/page_objects/produtos.page.js";
/// <reference types="cypress" />

let dadosLogin;

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil;
        });
    });

    beforeEach(() => {
        cy.visit('minha-conta');
        cy.get('#username').type(dadosLogin.usuario);
        cy.get('#password').type(dadosLogin.senha);
        cy.get('.woocommerce-form > .button').click();
        cy.get('.page-title').should('contain', 'Minha conta');
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.fixture('produtos').then(dadosProdutos => {
            produtosPage.buscarProduto(dadosProdutos[1].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dadosProdutos[1].tamanho,
                dadosProdutos[1].cor,
                dadosProdutos[1].quantidade
            );
            cy.get('.woocommerce-message > .button').click();
            produtosPage.buscarProduto(dadosProdutos[2].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dadosProdutos[2].tamanho,
                dadosProdutos[2].cor,
                dadosProdutos[2].quantidade
            );
            cy.get('.woocommerce-message > .button').click();
            produtosPage.buscarProduto(dadosProdutos[3].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dadosProdutos[3].tamanho,
                dadosProdutos[3].cor,
                dadosProdutos[3].quantidade
            );
            cy.get('.woocommerce-message > .button').click();
            produtosPage.buscarProduto(dadosProdutos[0].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dadosProdutos[0].tamanho,
                dadosProdutos[0].cor,
                dadosProdutos[0].quantidade
            );

            cy.get('.woocommerce-message > .button').click();
            cy.get('.checkout-button').first().click();
            
            cy.fixture('endereco').then(dadosEndereco => {

                cy.get('#billing_address_1').clear().type(dadosEndereco.endereco);
                cy.get('#billing_city').clear().type(dadosEndereco.cidade);
                cy.get('#billing_postcode').clear().type(dadosEndereco.cep);
                cy.get('#billing_phone').clear().type(dadosEndereco.telefone);
                cy.get('#select2-billing_state-container').click()
                cy.get('.select2-search__field').type('BA').click
                cy.get('.select2-results__options').contains('Bahia').click()
                cy.get('#terms').click();
                cy.get('#place_order').click();
                cy.get('.woocommerce-notice', { timeout: 10000 }).should('contain', 'Obrigado. Seu pedido foi recebido.')
            
            });
        });
    });
});
