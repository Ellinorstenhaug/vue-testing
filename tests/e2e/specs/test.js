// https://docs.cypress.io/api/introduction/api.html


//Skapa ett inlägg

// 1. Besök /create
// 2. Fyll i formulär
// 3. Spara formulär
//! 4. kolla att konfirmationsmeddelande kom
// 2. Besök url


describe('Create a easy blog post', () => {
  it('creates a valid blog post', () => {
    cy.visit('/create')
    cy.get('input#title').type("title")
    cy.get('input#excerpt').type("excerpt")
    cy.get('input#image').type("https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80")
    cy.get('textarea#content').type("content");
    cy.get('button[type="submit"]').click();

    cy.visit('blog/title')
  })
})
