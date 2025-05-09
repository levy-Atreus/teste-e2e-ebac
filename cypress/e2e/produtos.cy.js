import produtosPage from "../support/page_objects/produtos.page.js";
//funcionando
describe('Funcionalidade: Produtos', () => 
{

  beforeEach(() => {
    cy.visit('produtos');
    produtosPage.visitarUrl();
  });

  it('Deve selecionar um produto da lista', () => {
    cy.get('.product-block:contains("Josie Yoga Jacket")')
      .find('h3.name a')
      .click();
    cy.get('#tab-title-description > a').should('contain', 'Descrição');
    // funcionando
  });

  it('Deve buscar um produto com sucesso', () => {
    let produto = 'Josie Yoga Jacket'
    produtosPage.buscarProduto(produto);
    cy.get('.product_title').should('contain', produto)
    // funcionando
  });

  it('Deve visitar a página do produto', () => {
    produtosPage.visitarProduto('Josie Yoga Jacket')
    cy.get('.product_title').should('contain', 'Josie Yoga Jacket')
    // funcionando
  });

  it('Deve adicionar produto ao carrinho', () => {
    let qtd = 1
    produtosPage.buscarProduto('Josie Yoga Jacket')
    produtosPage.addProdutoCarrinho('M', 'Black', qtd)
    // funcionando
  });

  it('Deve adicionar produto ao carrinho com massa de dados', () => {
    cy.fixture('produtos').then(dados => {

    produtosPage.buscarProduto(dados[1].nomeProduto)
    produtosPage.addProdutoCarrinho(
      dados[1].tamanho, 
      dados[1].cor, 
      dados[1].quantidade)

    cy.get('.product_title').should('contain', dados[1].nomeProduto)
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message > .button').click()
    // funcionando
    });
  });

  it('deve acicionar o produto ao carrinho de forma simples', () => {
    //produtosPage.buscarProduto('Josie Yoga Jacket')
    
    cy.get('.button-variable-item-S').click()
    cy.get('.button-variable-item-Blue').click()
    cy.get('.input-text').clear().type('1')

    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
  });

  describe('Fluxo de compra com login', () => {
    it.only('Deve adicionar produto ao carrinho com massa de dados após o login', () => {
      cy.fixture('produtos').then(dados => {
        // **Passos de Login**
        cy.visit('/minha-conta'); // Ou a URL da sua página de login
        cy.get('#username').type('seu_usuario'); // Seletor do campo de usuário
        cy.get('#password').type('sua_senha'); // Seletor do campo de senha
        cy.get('button[name="login"]').click(); // Seletor do botão de login
        cy.url().should('not.include', '/minha-conta'); // Asserção para verificar o login (redirecionamento)
  
        // **Passos para adicionar o produto ao carrinho (seu código existente)**
        produtosPage.buscarProduto(dados[1].nomeProduto)
        produtosPage.addProdutoCarrinho(
          dados[1].tamanho,
          dados[1].cor,
          dados[1].quantidade
        )
  
        cy.get('.product_title').should('contain', dados[1].nomeProduto)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button').click()
        // funcionando
      });
    });
  });
});