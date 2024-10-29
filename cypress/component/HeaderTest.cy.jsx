import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from '../../src/components/index';
import { AuthProvider } from '../../src/contexts/AuthContext';
import { CommunityProvider } from '../../src/contexts/CommunityContext';
import { NewsApiProvider } from '../../src/contexts/NewsApiContext';
import { UserArticlesProvider } from '../../src/contexts/UserArticlesContext';

describe('Header Component', () => {
    it('renders Header component correctly', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Header />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );
        cy.get('.header').should('exist');
    });

    it('contains a logo or branding', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Header />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );
        cy.get('.header-logo').should('exist');
    });

    it('contains a navbar', () => {
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <Header />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );

        cy.get('.header-navbar').should('exist');
        cy.get('.header-logo').should('exist');
    });
});
