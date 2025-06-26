import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Home from '../src/pages/home/Home';
import Login from '../src/pages/login/Login';
import Register from '../src/pages/register/Register';

describe('Інтеграційні тести для сторінки авторизації користувача веб-додатку', () => {
    test('T_028 Перевірка коректності рендеру сторінки', async () => {
        renderReusable(['/login'], [{ path: '/login', element: <Login /> }]);

        expect(await screen.findByTestId('login-title')).toBeInTheDocument();
        expect(await screen.getByTestId('email-input')).toBeInTheDocument();
        expect(await screen.getByTestId('password-input')).toBeInTheDocument();
        expect(await screen.findByTestId('link-to')).toBeInTheDocument();
        expect(await screen.findByRole('button')).toBeInTheDocument();
    });
    test('T_029 Перевірка можливості перейти на сторінку реєстрації', async () => {
        renderReusable(
            ['/login'],
            [
                { path: '/login', element: <Login /> },
                { path: '/register', element: <Register /> },
            ],
        );

        const link = await screen.findByText("Don't have account?");
        expect(link).toBeInTheDocument();
        await userEvent.click(link);

        expect(await screen.findByTestId('create-acc-title')).toBeInTheDocument();
    });

    test('T_030 НЕВДАЛЕ надсилання запиту на авторизацію зі сторінки /login', async () => {
        renderReusable(
            ['/login'],
            [
                { path: '/login', element: <Login /> },
                { path: '/home', element: <Home /> },
            ],
        );

        await userEvent.type(screen.getByTestId('email-input'), 'kenobi@gmail.com');
        await userEvent.type(screen.getByTestId('password-input'), 'невірний пароль');

        await userEvent.click(screen.getByRole('button'));

        const elements = await screen.findAllByText('Login');
        for (const el of elements) {
            expect(el).toBeInTheDocument();
        }

        const errMessage = await screen.findByTestId('error-msg');
        expect(errMessage).toBeVisible();
        expect(errMessage.textContent).toBe('Invalid credentials, please try again.');
    });
    test('T_031 УСПІШНЕ надсилання запиту на авторизацію зі сторінки /login', async () => {
        renderReusable(
            ['/login'],
            [
                { path: '/login', element: <Login /> },
                { path: '/home', element: <Home /> },
            ],
        );

        await loginUser('kenobi@gmail.com', '12345678');
    });
});
