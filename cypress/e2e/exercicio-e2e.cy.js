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
            // Adiciona o primeiro produto ao carrinho
            produtosPage.buscarProduto(dadosProdutos[1].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dadosProdutos[1].tamanho,
                dadosProdutos[1].cor,
                dadosProdutos[1].quantidade
            );
            cy.get('.woocommerce-message > .button').click(); // Vai para o carrinho ou continua comprando

            // Adiciona o segundo produto ao carrinho
            produtosPage.buscarProduto(dadosProdutos[2].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dadosProdutos[2].tamanho,
                dadosProdutos[2].cor,
                dadosProdutos[2].quantidade
            );
            cy.get('.woocommerce-message > .button').click(); // Vai para o carrinho ou continua comprando

            // Adiciona o terceiro produto ao carrinho
            produtosPage.buscarProduto(dadosProdutos[3].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dadosProdutos[3].tamanho,
                dadosProdutos[3].cor,
                dadosProdutos[3].quantidade
            );
            cy.get('.woocommerce-message > .button').click(); // Vai para o carrinho ou continua comprando

            // Adiciona o quarto produto (você estava repetindo o terceiro)
            produtosPage.buscarProduto(dadosProdutos[0].nomeProduto); // Assumindo que você queria o índice 0 para o quarto produto
            produtosPage.addProdutoCarrinho(
                dadosProdutos[0].tamanho,
                dadosProdutos[0].cor,
                dadosProdutos[0].quantidade
            );
            cy.get('.woocommerce-message > .button').click(); // Vai para o carrinho

            // Segue para o checkout (agora deve ser chamado apenas uma vez)
            cy.get('.checkout-button').first().click();

            // TODO: Preencher os dados do checkout
            // ...

            // TODO: Validar a compra ao final
            // ...
        });
    });
});