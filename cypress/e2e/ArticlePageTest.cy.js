describe('article page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login');
        cy.get('[data-testid="cypress-email-input"]').type('e2e@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345678');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');
    });

    it('checks if article title exists', () => {
        cy.get('.news-list').should('be.visible');
        cy.get('.news-item').should('have.length.greaterThan', 0);

        cy.get('.news-item').eq(1).find('.item-button').should('be.visible');

        cy.get('.news-item').eq(1).find('.item-button').click();

        cy.url().should('include', '/2');

        cy.get('.article-page-title').should('be.visible');
        cy.get('.article-page-title').should('have.length.greaterThan', 0);
    });
    it('checks if article image exists', () => {
        cy.visit('http://localhost:8080/home');
        cy.get('.news-list').should('be.visible');
        cy.get('.news-item').should('have.length.greaterThan', 0);

        cy.get('.news-item').eq(2).find('.item-button').should('be.visible');

        cy.get('.news-item').eq(2).find('.item-button').click();

        cy.url().should('include', '/3');

        cy.get('.article-img').should('be.visible');
    });

    it('checks if article content exists', () => {
        cy.visit('http://localhost:8080/sport');
        cy.get('.news-list').should('be.visible');
        cy.get('.news-item').should('have.length.greaterThan', 0);

        cy.get('.main-news-item').should('be.visible');

        cy.get('.main-news-item').find('.main-item-button').click();

        cy.url().should('include', '/0');

        cy.get('.article-text').should('be.visible');
        cy.get('.article-text').should('have.length.greaterThan', 0);
    });

    it('checks if link to full article works properly', () => {
        cy.visit('http://localhost:8080/science');
        cy.get('.news-list').should('be.visible');
        cy.get('.news-item').should('have.length.greaterThan', 0);

        cy.get('.news-item').eq(4).find('.item-button').should('be.visible');

        cy.get('.news-item').eq(4).find('.item-button').click();

        cy.url().should('include', '/5');

        cy.get('.article-text-link').should('be.visible');
        cy.get('.article-text-link').should('have.text', 'Read more');
        cy.get('.article-text-link').click();
    });

    it('checks if article doesnt exist on index 56', () => {
        cy.visit('http://localhost:8080/tech');
        cy.get('.news-list').should('be.visible');
        cy.get('.news-item').should('have.length.greaterThan', 0);

        cy.visit('http://localhost:8080/56');

        cy.window().then((win) => {
            cy.spy(win.console, 'error').as('consoleError');
        });

        cy.get('@consoleError').should('be.calledWith', 'No articles found or invalid ID');
    });
});
