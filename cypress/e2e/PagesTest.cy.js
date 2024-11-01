describe('sport, tech, science pages test', () => {
    before(() => {
        cy.visit('http://localhost:8080/login');
        cy.get('[data-testid="cypress-email-input"]').type('e2e@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345678');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');
    });

    it('checks if pages have proper apiRoute', () => {
        cy.url().should('include', '/home');

        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');

        cy.visit('http://localhost:8080/sport');
        cy.url().should('include', '/sport');
        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');

        cy.visit('http://localhost:8080/science');
        cy.url().should('include', '/science');
        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');

        cy.visit('http://localhost:8080/tech');
        cy.url().should('include', '/tech');
        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');
    });
});
