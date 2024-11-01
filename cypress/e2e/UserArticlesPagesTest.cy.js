describe('User articles page and new user article page tests', () => {
    beforeEach(() => {
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

        cy.get('.link-to-user-articles').should('be.visible');
        cy.get('.link-to-user-articles').click();

        cy.url().should('include', '/user-articles');
    });

    it('checks if user-articles page rendered properly', () => {
        cy.url().should('include', '/user-articles');

        cy.get('.user-articles-page-title-h1').should('have.text', 'Articles written by yourself');

        cy.get('.link-to-new-article').should('be.visible');
        cy.get('.link-to-new-article').should('have.text', 'New');

        cy.get('.user-articles-list').should('have.length.greaterThan', 0);

        cy.get('.article-item').eq(0).find('.article-item-container').should('be.visible');
        cy.get('.article-item').eq(0).find('.article-title').should('have.text', 'Test article for cypress');
        cy.get('.article-item').eq(0).find('.article-desc').should('have.text', 'Test article for cypress description');
        cy.get('.article-item').eq(0).find('.article-buttons-container').should('be.visible');
        cy.get('.article-item').eq(0).find('.article-item-img').should('be.visible');
    });

    it('checks if can create new article', () => {
        cy.url().should('include', '/user-articles');

        cy.get('.link-to-new-article').should('be.visible');
        cy.get('.link-to-new-article').should('have.text', 'New');
        cy.get('.link-to-new-article').click();

        cy.url().should('include', '/new-article');

        cy.get('.new-article-error-stack').should('not.be.visible');

        cy.get('.new-article-title-input').should('be.visible');
        cy.get('.new-article-title-input').type('Creating new article in test');

        cy.get('.article-desc-input-field').should('be.visible');
        cy.get('.article-desc-input-field').type('Creating new article in test description');

        cy.get('.new-article-content-field .ql-editor').click().type('This is some sample text typed in the editor.');

        cy.get('.new-article-content-field .ql-editor').should(
            'contain.text',
            'This is some sample text typed in the editor.',
        );

        cy.get('.create-article-button').should('be.visible');
        cy.get('.create-article-button').click();

        cy.url().should('include', '/user-articles');

        cy.get('.user-articles-page-title-h1').should('have.text', 'Articles written by yourself');

        cy.get('.link-to-new-article').should('be.visible');
        cy.get('.link-to-new-article').should('have.text', 'New');

        cy.get('.user-articles-list').should('have.length.greaterThan', 0);

        cy.get('.article-item').eq(0).find('.article-item-container').should('be.visible');
        cy.get('.article-item').eq(0).find('.article-title').should('have.text', 'Creating new article in test');
        cy.get('.article-item')
            .eq(0)
            .find('.article-desc')
            .should('have.text', 'Creating new article in test description');
        cy.get('.article-item').eq(0).find('.article-buttons-container').should('be.visible');
        cy.get('.article-item').eq(0).find('.article-item-img').should('be.visible');
    });

    it('checks if can delete new article', () => {
        cy.url().should('include', '/user-articles');

        cy.get('.user-articles-list').should('have.length.greaterThan', 0);

        cy.get('.article-item').eq(0).find('.article-item-container').should('be.visible');
        cy.get('.article-item').eq(0).find('.article-title').should('have.text', 'Creating new article in test');
        cy.get('.article-item')
            .eq(0)
            .find('.article-desc')
            .should('have.text', 'Creating new article in test description');
        cy.get('.article-item').eq(0).find('.article-buttons-container').should('be.visible');
        cy.get('.article-item').eq(0).find('.article-item-img').should('be.visible');

        cy.get('.article-item').eq(0).find('.delete-article-button').should('be.visible');
        cy.get('.article-item').eq(0).find('.delete-article-button').click();

        cy.get('.article-item').eq(0).find('.article-item-container').should('exist');
        cy.get('.article-item').eq(0).find('.article-title').should('have.text', 'Test article for cypress');
    });

    it('checks for error appearing on empty fields', () => {
        cy.url().should('include', '/user-articles');

        cy.get('.user-articles-list').should('have.length.greaterThan', 0);

        cy.get('.article-item').eq(0).find('.article-item-container').should('be.visible');

        cy.get('.link-to-new-article').should('be.visible');
        cy.get('.link-to-new-article').should('have.text', 'New');
        cy.get('.link-to-new-article').click();

        cy.get('.new-article-error-stack').should('not.be.visible');

        cy.get('.create-article-button').should('be.visible');
        cy.get('.create-article-button').click();

        cy.get('.new-article-error-stack').should('be.visible');

        cy.get('.error').should('have.text', 'Article title should be more than 5');

        cy.get('.new-article-title-input').should('be.visible');
        cy.get('.new-article-title-input').type('Creating new article in test');

        cy.get('.create-article-button').should('be.visible');
        cy.get('.create-article-button').click();

        cy.get('.new-article-error-stack').should('be.visible');

        cy.get('.error').should('have.text', 'Article description should be more that 10');

        cy.get('.article-desc-input-field').should('be.visible');
        cy.get('.article-desc-input-field').type('Creating new article in test description');

        cy.get('.create-article-button').should('be.visible');
        cy.get('.create-article-button').click();

        cy.get('.new-article-error-stack').should('be.visible');

        cy.get('.error').should('have.text', 'Article content length should be more than 20');
    });

    it('checks for error appearing on full fields', () => {
        cy.url().should('include', '/user-articles');

        cy.get('.user-articles-list').should('have.length.greaterThan', 0);

        cy.get('.article-item').eq(0).find('.article-item-container').should('be.visible');

        cy.get('.link-to-new-article').should('be.visible');
        cy.get('.link-to-new-article').should('have.text', 'New');
        cy.get('.link-to-new-article').click();

        cy.get('.new-article-error-stack').should('not.be.visible');

        cy.get('.new-article-title-input').should('be.visible');
        cy.get('.new-article-title-input').type(
            'Creating new article in Creating new article in testCreating new article in testCreating new article in testCreating new article in testCreating new article in testCreating new article in testCreating new article in testCreating new article in testCreating new article in testCreating new article in testCreating new article in test',
        );

        cy.get('.create-article-button').should('be.visible');
        cy.get('.create-article-button').click();

        cy.get('.new-article-error-stack').should('be.visible');

        cy.get('.error').should('have.text', 'Article title should be less than 70');

        cy.get('.new-article-title-input').should('be.visible');
        cy.get('.new-article-title-input').clear().type('Creating new article in test');

        cy.get('.article-desc-input-field').should('be.visible');
        cy.get('.article-desc-input-field').type(
            'Creating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test descriptionCreating new article in test description',
        );

        cy.get('.create-article-button').should('be.visible');
        cy.get('.create-article-button').click();

        cy.get('.new-article-error-stack').should('be.visible');

        cy.get('.error').should('have.text', 'Article description should be less than 200');

        cy.get('.article-desc-input-field').should('be.visible');
        cy.get('.article-desc-input-field').clear().type('Creating new article in test description');

        cy.get('.create-article-button').should('be.visible');
        cy.get('.create-article-button').click();

        cy.get('.new-article-error-stack').should('be.visible');

        cy.get('.error').should('have.text', 'Article content length should be more than 20');
    });
});
