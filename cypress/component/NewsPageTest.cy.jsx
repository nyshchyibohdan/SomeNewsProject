import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Footer, Header, NewsPages } from '../../src/components/index';
import { AuthProvider } from '../../src/contexts/AuthContext';
import { CommunityProvider } from '../../src/contexts/CommunityContext';
import { NewsApiProvider } from '../../src/contexts/NewsApiContext';
import { UserArticlesProvider } from '../../src/contexts/UserArticlesContext';

const apiRoute = 'http://localhost:5000/api/newsapi/sport';

describe('NewsPagesTest component test', () => {
    it('checks if main news exist', () => {
        cy.viewport(1440, 550);
        cy.mount(
            <AuthProvider>
                <NewsApiProvider>
                    <UserArticlesProvider>
                        <CommunityProvider>
                            <BrowserRouter>
                                <NewsPages apiRoute={apiRoute} />
                            </BrowserRouter>
                        </CommunityProvider>
                    </UserArticlesProvider>
                </NewsApiProvider>
            </AuthProvider>,
        );

        cy.get(Header).should('exist');
        cy.get(Footer).should('exist');

        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');
    });
});
