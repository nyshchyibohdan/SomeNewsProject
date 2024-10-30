import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Navbar } from '../../src/components/index';
import { AuthProvider } from '../../src/contexts/AuthContext';
import { CommunityProvider } from '../../src/contexts/CommunityContext';
import { NewsApiProvider } from '../../src/contexts/NewsApiContext';
import { UserArticlesProvider } from '../../src/contexts/UserArticlesContext';
import { logout } from '../../src/utils/auth';

describe('Navbar Component Test', () => {
    it('logs out user and redirects to /login', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Navbar />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );

        cy.get('.dropdown-menu-button').click();

        cy.get('.logout-button').click();

        cy.url().should('include', '/login');
    });

    it('renders the Navbar correctly with all links', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Navbar />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );

        cy.get('.link-home').should('contain.text', 'Home');
        cy.get('.link-tech').should('contain.text', 'Technology');
        cy.get('.link-sport').should('contain.text', 'Sport');
        cy.get('.link-science').should('contain.text', 'Science');
        cy.get('.link-reposts').should('contain.text', 'Community');
        cy.get('.dropdown-menu-button').should('contain.html', 'img');
        cy.get('.navbar-avatar').should('exist');
    });

    it('checks if can go to different pages', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Navbar />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );

        cy.get('.link-home').should('contain.text', 'Home');
        cy.get('.link-tech').should('contain.text', 'Technology');
        cy.get('.link-sport').should('contain.text', 'Sport');
        cy.get('.link-science').should('contain.text', 'Science');
        cy.get('.link-reposts').should('contain.text', 'Community');
        cy.get('.dropdown-menu-button').should('contain.html', 'img');
        cy.get('.navbar-avatar').should('exist');

        cy.get('.link-tech').click();
        cy.url().should('include', '/tech');

        cy.get('.link-sport').click();
        cy.url().should('include', '/sport');

        cy.get('.link-science').click();
        cy.url().should('include', '/science');

        cy.get('.link-reposts').click();
        cy.url().should('include', '/community');

        cy.get('.link-home').click();
        cy.url().should('include', '8081/');
    });

    it('checks if profile avatar disappears when in profile', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Navbar />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );

        cy.get('.link-home').should('contain.text', 'Home');
        cy.get('.link-tech').should('contain.text', 'Technology');
        cy.get('.link-sport').should('contain.text', 'Sport');
        cy.get('.link-science').should('contain.text', 'Science');
        cy.get('.link-reposts').should('contain.text', 'Community');
        cy.get('.dropdown-menu-button').should('contain.html', 'img');
        cy.get('.navbar-avatar').should('exist');

        cy.get('.dropdown-menu').should('not.exist');

        cy.get('.dropdown-menu-button').click();

        cy.get('.dropdown-menu').should('be.visible');
        cy.get('.profile-link').should('contain.text', 'Profile');
        cy.get('.logout-button').should('contain.text', 'Logout');

        cy.get('.profile-link').click();

        cy.url().should('include', '/profile');

        cy.get('.dropdown-container').should('not.exist');

        cy.get('.link-home').click();
        cy.url().should('include', '/');

        cy.get('.dropdown-container').should('exist');
    });

    it('applies "link-current" class to active link based on path', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Navbar />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );

        cy.get('.link-tech').should('not.have.class', 'link-current');
        cy.get('.link-home').should('have.class', 'link-current');
        cy.get('.link-tech').click();

        cy.url().should('include', '/tech');
        cy.get('.link-tech').should('have.class', 'link-current');
        cy.get('.link-home').should('not.have.class', 'link-current');
    });

    it('toggles the user dropdown when avatar is clicked', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Navbar />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
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
});
