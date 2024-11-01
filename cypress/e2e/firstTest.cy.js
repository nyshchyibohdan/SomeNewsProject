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

    it('Checks is error stack is visible when error in login page', () => {
        cy.visit('http://localhost:8080/login');

        cy.get('.error-stack').should('not.be.visible');

        cy.get('[data-testid="cypress-email-input"]').type('cypresstest@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345677');

        cy.get('.login-button').click();

        cy.url().should('include', '/login');

        cy.get('.error-stack').should('be.visible');
    });

    it('Checks is error stack is visible when error in register page', () => {
        cy.visit('http://localhost:8080/register');

        cy.get('.error-stack').should('not.be.visible');

        cy.get('[data-testid="cypress-reg-nickname-input"]').type('cy');
        cy.get('[data-testid="cypress-reg-email-input"]').type('cypresstest@gmail.com');
        cy.get('[data-testid="cypress-reg-password-input"]').type('12345678');
        cy.get('[data-testid="cypress-reg-confirm-password-input"]').type('12345678');

        cy.get('.register-button').click();

        cy.url().should('include', '/register');

        cy.get('.error-stack').should('be.visible');
    });
});
