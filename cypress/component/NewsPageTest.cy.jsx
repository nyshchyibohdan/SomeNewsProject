import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Footer, Header, NewsPages } from '../../src/components/index';

const apiRoute = 'http://localhost:5000/api/newsapi/sport';

describe('NewsPagesTest component test', () => {
    it('checks if main news exist', () => {
        cy.mount(
            <BrowserRouter>
                <NewsPages apiRoute={apiRoute} />
            </BrowserRouter>,
        );

        cy.get(Header).should('exist');
        cy.get(Footer).should('exist');

        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');
    });

    it('checks if can`t open main article without authorization', () => {
        cy.mount(
            <BrowserRouter>
                <NewsPages apiRoute={apiRoute} />
            </BrowserRouter>,
        );

        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');

        cy.get('.main-news-item').click();
        cy.url().should('include', '/login');
    });

    it('checks if can`t open other article without authorization', () => {
        cy.mount(
            <BrowserRouter>
                <NewsPages apiRoute={apiRoute} />
            </BrowserRouter>,
        );

        cy.get('.news-list').should('be.visible');
        cy.get('.news-item').eq(5).should('be.visible');
        cy.get('.news-item')
            .eq(5)
            .invoke('html')
            .then((html) => {
                cy.log(html);
            });

        cy.get('.news-item').eq(5).click();
        cy.url().should('include', '/login');

        cy.mount(
            <BrowserRouter>
                <NewsPages apiRoute={apiRoute} />
            </BrowserRouter>,
        );

        cy.get('.news-list').should('be.visible');
        cy.get('.news-item').eq(0).should('be.visible');
        cy.get('.news-item')
            .eq(0)
            .invoke('html')
            .then((html) => {
                cy.log(html);
            });

        cy.get('.news-item').eq(0).click();
        cy.url().should('include', '/login');
    });
});
