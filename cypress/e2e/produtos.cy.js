import produtosPage from "../support/page_objects/produtos.page.js";
//funcionando
describe('Funcionalidade: Produtos', () => {

  beforeEach(() => {
    cy.visit('produtos');
    produtosPage.visitarUrl();
  });

  it('Deve selecionar um produto da lista', () => {
    cy.get('.product-block:contains("Aero Daily Fitness Tee")')
      .find('h3.name a')
      .click();
    cy.get('#tab-title-description > a').should('contain', 'Descrição');
    // funcionando
  });

  it('Deve buscar um produto com sucesso', () => {
    let produto = 'Aero Daily Fitness Tee'
    produtosPage.buscarProduto(produto);
    cy.get('.product_title').should('contain', produto)
    // funcionando
  });

  it('Deve visitar a página do produto', () => {
    produtosPage.visitarProduto('Aero Daily Fitness Tee')
    cy.get('.product_title').should('contain', 'Aero Daily Fitness Tee')
    // funcionando
  });

  it('Deve adicionar produto ao carrinho', () => {
    let qtd = 1
    produtosPage.buscarProduto('Aero Daily Fitness Tee')
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
    // funcionando
   });
  });
});