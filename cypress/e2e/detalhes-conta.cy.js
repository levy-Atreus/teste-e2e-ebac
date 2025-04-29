import detalhesConta from '../support/page_objects/detalhesConta.js';

describe('funcionalidade: detalhes da conta', () => {
    beforeEach(() => {
        cy.visit('minha-conta/edit-account');
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario, login.senha);
        });
        cy.detalhesConta = detalhesConta; // Garante que a instância do Page Object esteja acessível
    });

    it('deve completar detalhes da conta sucesso', () => {
        cy.detalhesConta.clear('Levy', 'Atreus', '0');
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.');
    });
});