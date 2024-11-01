describe('Community articles and user full articles pages tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login');

        cy.get('[data-testid="cypress-email-input"]').type('e2e@gmail.com');
        cy.get('[data-testid="cypress-password-input"]').type('12345678');

        cy.get('.login-button').click();

        cy.url().should('include', '/home');

        cy.get('.link-reposts').should('be.visible');
        cy.get('.link-reposts').click();

        cy.url().should('include', '/community');
    });

    it('checks if community articles render properly', () => {
        cy.url().should('include', '/community');

        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');

        cy.get('.news-item').should('have.length.greaterThan', 0);

        cy.get('.news-item').eq(1).find('.item-button').should('be.visible');

        cy.get('.news-item').eq(1).find('.item-button').click();

        cy.url().should('include', '/user-full-article');
    });

    it('checks if user full article render properly', () => {
        cy.url().should('include', '/community');

        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');

        cy.get('.news-item').should('have.length.greaterThan', 0);

        cy.get('.news-item').eq(1).find('.item-button').should('be.visible');

        cy.get('.news-item').eq(1).find('.item-button').click();

        cy.url().should('include', '/user-full-article');

        cy.get('.article-title').should('be.visible');
        cy.get('.article-title').should('have.length.greaterThan', 0);
        cy.get('.article-main-text').should('be.visible');
        cy.get('.article-main-text').should('have.length.greaterThan', 0);
        cy.get('.article-author').should('have.length.greaterThan', 0);
        cy.get('.article-repost-button').should('be.visible');
    });

    it('checks if can repost user full article', () => {
        cy.url().should('include', '/community');

        cy.get('.news-list').should('be.visible');
        cy.get('.main-news-item').should('be.visible');

        cy.get('.news-item').should('have.length.greaterThan', 0);

        cy.get('.news-item').eq(2).find('.item-button').should('be.visible');

        cy.get('.news-item').eq(2).find('.item-button').click();

        cy.url().should('include', '/user-full-article');

        cy.get('.article-title').should('be.visible');
        cy.get('.article-title').should('have.length.greaterThan', 0);
        cy.get('.article-main-text').should('be.visible');
        cy.get('.article-main-text').should('have.length.greaterThan', 0);
        cy.get('.article-author').should('have.length.greaterThan', 0);

        cy.get('.article-repost-button')
            .should('be.visible')
            .and('not.have.class', 'article-button-active')
            .and('contain', 'Repost');
        cy.get('.article-repost-button').click();

        cy.url().should('include', '/user-full-article');

        cy.get('.article-repost-button').should('have.class', 'article-button-active').and('contain', 'Reposted');

        cy.get('.article-repost-button').should('be.visible');
        cy.get('.article-repost-button').click();

        cy.get('.article-repost-button')
            .should('be.visible')
            .and('not.have.class', 'article-button-active')
            .and('contain', 'Repost');
    });
});
