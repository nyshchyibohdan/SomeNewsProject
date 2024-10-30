import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from '../../src/components';
import Header from '../../src/components/header/Header';
import { AuthProvider } from '../../src/contexts/AuthContext';
import { CommunityProvider } from '../../src/contexts/CommunityContext';
import { NewsApiProvider } from '../../src/contexts/NewsApiContext';
import { UserArticlesProvider } from '../../src/contexts/UserArticlesContext';

describe('Footer Component', () => {
    it('renders Footer component correctly', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Footer />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );
        cy.get('.footer').should('exist');
        cy.get('.footer-logo-link').should('exist');
        cy.get('.footer-git-link').should('exist');
        cy.get('.footer-mail-to-link').should('exist');
    });

    it('checks if logo link works properly', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Header />
                                <Footer />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );
        cy.get('.link-tech').should('contain.text', 'Technology');
        cy.get('.link-tech').click();

        cy.url().should('include', '/tech');

        cy.get('.footer-logo-link').should('exist');
        cy.get('.footer-logo-link').click();
        cy.url().should('include', '/home');
    });

    it('checks if Mail To link has correct email attribute', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Footer />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );

        cy.get('.footer-mail-to-link')
            .should('have.attr', 'href')
            .and('match', /^mailto:/)
            .and('include', 'nyshchyi.bohdan@student.uzhnu.edu.ua');
    });
});
