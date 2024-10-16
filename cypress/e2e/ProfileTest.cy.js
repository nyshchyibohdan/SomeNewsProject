describe('Profile page test', () => {
    it('Can access the user profile', () => {
        cy.visit('http://localhost:8080/register');

        cy.get('.register-form').should('exist');
        cy.get('[data-testid="cypress-reg-nickname-input"]').type('cypressTest');
        cy.get('[data-testid="cypress-reg-email-input"]').type('cypresstest@gmail.com');
        cy.get('[data-testid="cypress-reg-password-input"]').type('12345678');
        cy.get('[data-testid="cypress-reg-confirm-password-input"]').type('12345678');

        cy.get('[data-testid="cypress-reg-button"]').click();

        cy.url().should('include', '/home');

        cy.get('.dropdown-menu-button').should('be.visible');
        cy.get('.dropdown-menu-button').click();

        cy.get('.dropdown-menu').should('be.visible');
        cy.get('.profile-link').should('exist');
        cy.get('.profile-link').click();
        cy.url().should('include', '/profile');

        cy.get('.profile-nickname').should('have.text', 'cypressTest');
        cy.get('.profile-image').should('exist');
    });

    it('Can change password', () => {
        cy.visit('http://localhost:8080/login');

        cy.get('[data-testid="cypress-email-input"]').type('cypresstest@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345678');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');

        cy.get('.dropdown-menu-button').should('be.visible');
        cy.get('.dropdown-menu-button').click();

        cy.get('.dropdown-menu').should('be.visible');
        cy.get('.profile-link').should('exist');
        cy.get('.profile-link').click();
        cy.url().should('include', '/profile');

        cy.get('.change-password-button').should('exist');
        cy.get('.change-password-button').click();

        cy.get('.password-change-form').should('be.visible');
        cy.get('#oldPassword').type('12345678');
        cy.get('#newPassword').type('12345677');
        cy.get('#confirmPassword').type('12345677');
        cy.get('.submit-pass-change-button').click();

        cy.get('.profile-logout-button').should('exist');
        cy.get('.profile-logout-button').click();

        cy.url().should('include', '/login');

        cy.get('.email-input').type('cypresstest@gmail.com');
        cy.get('.password-input').type('12345677');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');
    });

    it('Can change password back and delete account', () => {
        cy.visit('http://localhost:8080/login');

        cy.get('[data-testid="cypress-email-input"]').type('cypresstest@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345677');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');

        cy.get('.dropdown-menu-button').should('be.visible');
        cy.get('.dropdown-menu-button').click();

        cy.get('.dropdown-menu').should('be.visible');
        cy.get('.profile-link').should('exist');
        cy.get('.profile-link').click();
        cy.url().should('include', '/profile');

        cy.get('.change-password-button').should('exist');
        cy.get('.change-password-button').click();

        cy.get('.password-change-form').should('be.visible');
        cy.get('#oldPassword').type('12345677');
        cy.get('#newPassword').type('12345678');
        cy.get('#confirmPassword').type('12345678');
        cy.get('.submit-pass-change-button').click();

        cy.get('.delete-account-button').should('exist');
        cy.get('.delete-account-button').click();

        cy.get('#confirm-pass-to-delete').should('exist');
        cy.get('#confirm-pass-to-delete').type('12345678');

        cy.get('.submit-account-delete-button').click();

        cy.url().should('include', '/login');
    });
});
