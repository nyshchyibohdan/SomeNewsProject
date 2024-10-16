import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Navbar } from '../../src/components/index';

describe('Navbar Component Test', () => {
    it('renders the Navbar correctly with all links', () => {
        cy.mount(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>,
        );

        cy.get('.link-home').should('contain.text', 'Home');
        cy.get('.link-tech').should('contain.text', 'Technology');
        cy.get('.link-sport').should('contain.text', 'Sport');
        cy.get('.link-science').should('contain.text', 'Science');
        cy.get('.link-reposts').should('contain.text', 'Reposts');
        cy.get('.dropdown-menu-button').should('contain.html', 'img');
        cy.get('.navbar-avatar').should('exist');
    });

    it('toggles the user dropdown when avatar is clicked', () => {
        cy.mount(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>,
        );

        cy.get('.dropdown-menu').should('not.exist');

        cy.get('.dropdown-menu-button').click();

        cy.get('.dropdown-menu').should('be.visible');
        cy.get('.profile-link').should('contain.text', 'Profile');
        cy.get('.logout-button').should('contain.text', 'Logout');

        cy.get('.dropdown-menu-button').click();
        cy.get('.dropdown-menu').should('not.exist');
        cy.get('.profile-link').should('not.exist');
        cy.get('.logout-button').should('not.exist');
    });

    it('redirects to /login on logout', () => {
        cy.mount(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>,
        );

        cy.get('.dropdown-menu-button').click();

        cy.get('.logout-button').should('exist');

        cy.get('.logout-button').click();

        cy.url().should('include', '/login');
    });
});
