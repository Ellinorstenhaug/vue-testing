describe('E2E test flow when creating comment', () => {
    it('creates a valid comment', () => {
        cy.visit('/');
        cy.get('.card').first().click();

        cy.get('input#name').type("John Doe").should('have.value', "John Doe");
        cy.get('textarea#content').type("content").should('have.value', 'content');
        cy.get('button[type="submit"]').click();

        cy.get('.valid').should('contain', 'Your comment has been posted')
        cy.get('.comment').should('contain', 'John Doe');
    })
})