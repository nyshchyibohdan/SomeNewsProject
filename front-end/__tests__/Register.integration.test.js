import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Home from '../src/pages/home/Home';
import Login from '../src/pages/login/Login';
import Profile from '../src/pages/profile/Profile';
import Register from '../src/pages/register/Register';
import { registerAccount } from './utils/utils.helper';

describe('Інтеграційні тести для сторінки реєстрації користувача веб-додатку', () => {
    test('Перевірка коректності рендеру сторінки', async () => {
        renderReusable(['/register'], [{ path: '/register', element: <Register /> }]);

        expect(await screen.findByTestId('create-acc-title')).toBeVisible();
        expect(await screen.getByTestId('reg-nickname-input')).toBeVisible();
        expect(await screen.getByTestId('reg-email-input')).toBeVisible();
        expect(await screen.getByTestId('reg-password-input')).toBeVisible();
        expect(await screen.getByTestId('reg-confirm-password-input')).toBeVisible();
        expect(await screen.findByText('Already have account?')).toBeVisible();
        expect(await screen.findByRole('button')).toBeVisible();
    });
    test('Перевірка можливості перейти на сторінку авторизації', async () => {
        renderReusable(
            ['/register'],
            [
                { path: '/register', element: <Register /> },
                { path: '/login', element: <Login /> },
            ],
        );

        const link = await screen.findByText('Already have account?');
        expect(link).toBeVisible();
        await userEvent.click(link);

        expect(await screen.findByTestId('login-title')).toBeVisible();
    });

    test('НЕВДАЛЕ надсилання запиту на реєстрацію зі сторінки /register', async () => {
        renderReusable(['/register'], [{ path: '/register', element: <Register /> }]);

        await userEvent.type(screen.getByTestId('reg-nickname-input'), 'integration_test');
        await userEvent.type(screen.getByTestId('reg-email-input'), 'test.integration@gmail.com');
        await userEvent.type(screen.getByTestId('reg-password-input'), '12345678');
        await userEvent.type(screen.getByTestId('reg-confirm-password-input'), '12345');

        await userEvent.click(screen.getByRole('button'));

        const elements = await screen.findAllByText('Create account');
        for (const el of elements) {
            expect(el).toBeInTheDocument();
        }
        expect(await screen.findByTestId('0-error')).toBeVisible();
        expect(await screen.findByTestId('1-error')).toBeVisible();
        expect(await screen.findByText('Nickname length must be from 3 to 15')).toBeVisible();
    });
    test('УСПІШНЕ надсилання запиту на реєстрацію зі сторінки /register', async () => {
        renderReusable(
            ['/register'],
            [
                { path: '/register', element: <Register /> },
                { path: '/home', element: <Home /> },
            ],
        );

        await registerAccount('integration', 'test.integration@gmail.com', '12345678');
    });

    test('УСПІШНА спроба видалити акаунт', async () => {
        localStorage.clear();
        sessionStorage.clear();

        await setupAuthedUser('test.integration@gmail.com', '12345678');

        renderReusable(
            ['/profile'],
            [
                { path: '/profile', element: <Profile /> },
                { path: '/login', element: <Login /> },
            ],
        );

        const button = await screen.findByTestId('delete-acc-btn');
        expect(button.textContent).toBe('Delete');
        await userEvent.click(button);

        expect(await screen.findByTestId('delete-acc-modal'));

        await userEvent.type(await screen.findByTestId('delete-old-pass'), '12345678');

        const deleteBtn = await screen.findByRole('button', { name: 'Submit' });
        expect(deleteBtn.textContent).toBe('Submit');

        await userEvent.click(deleteBtn);

        expect(await screen.findByTestId('login-title')).toBeVisible();
    });
});
