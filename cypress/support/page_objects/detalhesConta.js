class DetalhesConta {
    clear(nome, sobrenome, numero) {
        cy.get('#account_first_name').clear().type(nome);
        cy.get('#account_last_name').clear().type(sobrenome);
        //cy.get('#account_phone').clear().type(numero);
        cy.get('button[name="save_account_details"]').click();
    }
}

export default new DetalhesConta();