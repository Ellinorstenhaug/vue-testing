describe('Create an easy blog post from home view', () => {
    it('creates a valid blog post from home view', () => {
        cy.visit('/');

        cy.get('#nav a').last().click()

        cy.get('input#title').type("title").should('have.value', 'title')
        cy.get('input#excerpt').type("excerpt").should('have.value', 'excerpt')
        cy.get('input#image').type("https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80").should('have.value', 'https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')
        cy.get('textarea#content').type("content").should('have.value', 'content')

        cy.get('button[type="submit"]').click()
        cy.visit('blog/title');
        cy.get('h1').should('contain', 'title');
        cy.get('img').should('have.attr', 'src', 'https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')
        cy.get('p').should('contain', 'content');    })
})

describe('gives error message when Content is not entered', () => {
    it('shows error message when content-field is not filled in', () => {
        cy.visit('/create')
        cy.get('input#title').type("This is a title").should('have.value', 'This is a title')
        cy.get('input#excerpt').type("This is a short excerpt").should('have.value', 'This is a short excerpt')
        cy.get('input#image').type("https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80").should('have.value', 'https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')

        cy.get('button[type="submit"]').click()
        cy.get('.create').should('contain', 'You have to write some content!')
    })
})

describe('gives error message when title is not entered', () => {
    it('shows error message when content-field is not filled in', () => {
        cy.visit('/create')
        cy.get('input#excerpt').type("This is a short excerpt").should('have.value', 'This is a short excerpt')
        cy.get('input#image').type("https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80").should('have.value', 'https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')
        cy.get('textarea#content').type("This is some content").should('have.value', 'This is some content')

        cy.get('button[type="submit"]').click()
        cy.get('.create').should('contain', 'You have to enter a title!')
    })
})

describe('Enter raw html in Content field', () => {
    it('creates a invalid blog post', () => {
        cy.visit('/create');
        cy.get('input#title').type("title").should('have.value', 'title');
        cy.get('input#excerpt').type("excerpt").should('have.value', 'excerpt');
        cy.get('input#image').type("https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80").should('have.value', 'https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
        cy.get('textarea#content').type("<h1 class='test'>This is a title</h1>").should('have.value', "<h1 class='test'>This is a title</h1>");
        cy.get('button[type="submit"]').click();

        cy.visit('blog/title');
        cy.get('h1.test').should('contain', 'This is a title');
    })
})

describe('Create new blogpost and visit from home', () => {
    it('creates a valid blog post, returns to home view and visits post that was just created', () => {
        cy.visit('/');

        cy.get('#nav a').last().click()

        cy.get('input#title').type("This is an example title").should('have.value', 'This is an example title')
        cy.get('input#excerpt').type("excerpt").should('have.value', 'excerpt')
        cy.get('input#image').type("https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80").should('have.value', 'https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')
        cy.get('textarea#content').type("content").should('have.value', 'content')

        cy.get('button[type="submit"]').click()
        
        cy.visit('/');

        cy.get('.blogpost--wrapper').find('.card').first().click();

        cy.get('h1').should('contain', 'This is an example title')
        cy.get('img').should('have.attr', 'src', 'https://images.unsplash.com/photo-1577578306649-09e937512e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')
        cy.get('p').should('contain', 'content');
    })
})