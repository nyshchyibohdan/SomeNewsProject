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

    it('checks if cant go to login page when authenticated', () => {
        cy.visit('http://localhost:8080/login');

        cy.get('[data-testid="cypress-email-input"]').type('cypresstest@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345677');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');

        cy.visit('http://localhost:8080/login');

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

    it('Checks if errors appear when needed while password changing', () => {
        cy.visit('http://localhost:8080/login');

        cy.get('[data-testid="cypress-email-input"]').type('e2e@gmail.com');
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
        cy.get('#newPassword').type('123456');
        cy.get('#confirmPassword').type('123456');
        cy.get('.submit-pass-change-button').click();

        cy.get('.modal-error-stack').should('be.visible');
        cy.get('.modal-error-stack').should('have.text', 'Password length is less that 8 symbols');

        cy.get('#oldPassword').type('12345678');
        cy.get('#newPassword').clear().type('12345678');
        cy.get('#confirmPassword').type('123456788');
        cy.get('.submit-pass-change-button').click();

        cy.get('.modal-error-stack').should('be.visible');
        cy.get('.modal-error-stack').should('have.text', "New password and confirmation password don't match");

        cy.get('.cancel-pass-change-button').should('exist');
        cy.get('.cancel-pass-change-button').click();
        cy.get('.password-change-form').should('not.exist');

        cy.get('.change-password-button').should('exist');
        cy.get('.change-password-button').click();

        cy.get('.password-change-form').should('be.visible');
        cy.get('#oldPassword').clear().type('123456789');
        cy.get('#newPassword').clear().type('12345677');
        cy.get('#confirmPassword').clear().type('12345677');
        cy.get('.submit-pass-change-button').click();

        cy.get('.modal-error-stack').should('be.visible');
        cy.get('.modal-error-stack').should('have.text', 'Invalid password');

        cy.get('.cancel-pass-change-button').should('exist');
        cy.get('.cancel-pass-change-button').click();
        cy.get('.password-change-form').should('not.exist');
    });

    it('Checks if errors appear when needed while password deleting', () => {
        cy.visit('http://localhost:8080/login');

        cy.get('[data-testid="cypress-email-input"]').type('e2e@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345678');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');

        cy.get('.dropdown-menu-button').should('be.visible');
        cy.get('.dropdown-menu-button').click();

        cy.get('.dropdown-menu').should('be.visible');
        cy.get('.profile-link').should('exist');
        cy.get('.profile-link').click();
        cy.url().should('include', '/profile');

        cy.get('.delete-account-button').should('exist');
        cy.get('.delete-account-button').click();

        cy.get('.delete-account-form').should('be.visible');
        cy.get('#confirm-pass-to-delete').type('123456');
        cy.get('.submit-account-delete-button').click();

        cy.get('.modal-error-stack').should('be.visible');
        cy.get('.modal-error-stack').should('have.text', 'Password length is less that 8 symbols');

        cy.get('#confirm-pass-to-delete').clear().type('1234567890');
        cy.get('.submit-account-delete-button').click();

        cy.get('.modal-error-stack').should('be.visible');
        cy.get('.modal-error-stack').should('have.text', 'Invalid password');

        cy.get('.cancel-account-delete-button').should('exist');
        cy.get('.cancel-account-delete-button').click();
        cy.get('.delete-account-form').should('not.exist');
    });

    it('Can change bio', () => {
        cy.visit('http://localhost:8080/login');

        cy.get('[data-testid="cypress-email-input"]').type('e2e@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345678');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');

        cy.get('.dropdown-menu-button').should('be.visible');
        cy.get('.dropdown-menu-button').click();

        cy.get('.dropdown-menu').should('be.visible');
        cy.get('.profile-link').should('exist');
        cy.get('.profile-link').click();
        cy.url().should('include', '/profile');

        cy.get('.profile-bio').should('exist');

        cy.get('.bio-input').should('not.exist');

        cy.get('.bio-edit-button').should('be.visible');
        cy.get('.bio-edit-button').click();

        cy.get('.bio-input').should('be.visible');
        cy.get('.bio-input-field').type('Testing bio input with cypress');

        cy.get('.save-bio-button').should('be.visible');
        cy.get('.save-bio-button').click();

        cy.visit('http://localhost:8080/profile');
        cy.url().should('include', '/profile');

        cy.get('.bio-input').should('not.exist');
        cy.get('.bio-input-text').should('be.visible');
        cy.get('.bio-input-text').should('have.text', 'Testing bio input with cypress');
    });

    it('Can logout from dropdown menu in navbar', () => {
        cy.visit('http://localhost:8080/login');

        cy.get('[data-testid="cypress-email-input"]').type('e2e@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345678');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');

        cy.get('.dropdown-menu-button').should('be.visible');
        cy.get('.dropdown-menu-button').click();

        cy.get('.dropdown-menu').should('be.visible');
        cy.get('.logout-button').should('be.visible');
        cy.get('.logout-button').click();

        cy.url().should('include', '/login');
    });
});
