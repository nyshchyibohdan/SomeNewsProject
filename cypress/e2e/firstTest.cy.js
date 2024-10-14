describe('login form check', () => {
    it('opens login form and check if text is visible', () => {
        cy.visit('http://localhost:8080');

        cy.get('[data-testid="cypress-login-title"]').should('be.visible');
    });

    it('checks if link to register works', () => {
        cy.visit('http://localhost:8080');

        cy.get('a[href="/register"]').click();
        cy.url().should('include', '/register');
    });

    it('checks if /home page navigates to login without authorization', () => {
        cy.visit('http://localhost:8080/home');

        cy.url().should('include', '/login');
    });
});
