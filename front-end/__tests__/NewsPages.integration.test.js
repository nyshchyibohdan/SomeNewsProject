import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Article from '../src/pages/article/Article';
import Community from '../src/pages/community/Community';
import Home from '../src/pages/home/Home';
import Login from '../src/pages/login/Login';
import Science from '../src/pages/science/Science';
import Sport from '../src/pages/sport/Sport';
import Technology from '../src/pages/technology/Technology';

async function linkToPage(name) {
    const testId = `${name.toLowerCase()}-page`;

    expect(await screen.findByTestId('header_')).toBeVisible();
    expect(await screen.findByTestId('navbar-section')).toContainElement(await screen.findByTestId('nav-container'));

    const link = await screen.findByRole('link', { name });
    await userEvent.click(link);

    expect(await screen.findByTestId(testId)).toBeInTheDocument();
}

describe('Інтеграційні тести для сторінки новин веб-додатку', () => {
    beforeAll(async () => {
        await setupAuthedUser('test.account@gmail.com', '12345678');
    });

    afterEach(() => {
        cleanup();
    });

    test('Перевірка коректності рендеру сторінки', async () => {
        renderReusable(['/home'], [{ path: '/home', element: <Home /> }]);

        const elements = await screen.findAllByTestId('home-page');
        expect(elements.length).toBeGreaterThan(0);
        for (const element of elements) {
            expect(element).toBeInTheDocument();
        }

        const lists = await screen.findAllByRole('list');
        expect(lists[0]).toHaveClass('news-list');
        expect(lists[0]).toBeVisible();

        const newsElements = await screen.findAllByRole('listitem');
        const links = await screen.findAllByTestId('test-item-link');
        const images = await screen.findAllByTestId('test-image');
        expect(newsElements.length).toBeGreaterThan(0);
        // eslint-disable-next-line unicorn/no-for-loop
        for (let i = 0; i < 5; i++) {
            const item = newsElements[i];
            expect(item).toBeVisible();
            expect(item).toContainElement(links[i]);
            expect(links[i]).toHaveAttribute('href', `/${i}`);

            expect(item).toContainElement(images[i]);
        }
    });
    test('Перевірка можливості перейти на сторінку головної новини', async () => {
        renderReusable(
            ['/home'],
            [
                { path: '/home', element: <Home /> },
                { path: '/0', element: <Article /> },
            ],
        );

        const newsElements = await screen.findAllByRole('listitem');
        const links = await screen.findAllByTestId('test-item-link');
        const images = await screen.findAllByTestId('test-image');
        expect(newsElements.length).toBeGreaterThan(0);
        // eslint-disable-next-line unicorn/no-for-loop
        for (let i = 0; i < newsElements.length; i++) {
            const item = newsElements[i];
            expect(item).toBeVisible();
            expect(item).toContainElement(links[i]);
            expect(links[i]).toHaveAttribute('href', `/${i}`);

            expect(item).toContainElement(images[i]);
        }

        expect(newsElements[0]).toHaveClass('main-news-item');
        const articleTitle = await screen.findByTestId('main-article-title');
        await userEvent.click(links[0]);

        expect(await screen.findByTestId('article-container')).toBeVisible();
        const pageTitle = await screen.findByTestId('article-page-title');

        expect(pageTitle.textContent).toBe(articleTitle.textContent);
    });

    test('Перевірка можливості перейти на сторінку інших новин', async () => {
        renderReusable(
            ['/home'],
            [
                { path: '/home', element: <Home /> },
                { path: '/1', element: <Article /> },
            ],
        );

        expect(await screen.findByTestId('header_')).toBeVisible();

        const newsElements = await screen.findAllByRole('listitem');
        const links = await screen.findAllByTestId('test-item-link');
        const images = await screen.findAllByTestId('test-image');
        expect(newsElements.length).toBeGreaterThan(0);
        // eslint-disable-next-line unicorn/no-for-loop
        for (let i = 0; i < 5; i++) {
            const item = newsElements[i];
            expect(item).toBeVisible();
            expect(item).toContainElement(links[i]);
            expect(links[i]).toHaveAttribute('href', `/${i}`);

            expect(item).toContainElement(images[i]);
        }

        expect(newsElements[1]).toHaveClass('other-news-item');

        const articleTitles = await screen.findAllByTestId('home-article-title');
        await userEvent.click(links[1]);

        expect(await screen.findByTestId('article-container')).toBeVisible();
        const pageTitle = await screen.findByTestId('article-page-title');

        expect(pageTitle.textContent).toBe(articleTitles[0].textContent);
    });
    test('Перевірка можливості перейти на сторінку категорії Technology', async () => {
        renderReusable(
            ['/home'],
            [
                { path: '/home', element: <Home /> },
                { path: '/tech', element: <Technology /> },
            ],
        );

        await linkToPage('Technology');
    });
    test('Перевірка можливості перейти на сторінку категорії Sport', async () => {
        renderReusable(
            ['/home'],
            [
                { path: '/home', element: <Home /> },
                { path: '/sport', element: <Sport /> },
            ],
        );

        await linkToPage('Sport', 'sport-page');
    });
    test('Перевірка можливості перейти на сторінку категорії Science', async () => {
        renderReusable(
            ['/home'],
            [
                { path: '/home', element: <Home /> },
                { path: '/science', element: <Science /> },
            ],
        );

        await linkToPage('Science');
    });
    test('Перевірка можливості перейти на сторінку категорії Community', async () => {
        renderReusable(
            ['/home'],
            [
                { path: '/home', element: <Home /> },
                { path: '/community', element: <Community /> },
            ],
        );

        await linkToPage('Community');
    });
});
