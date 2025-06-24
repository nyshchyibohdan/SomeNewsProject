import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Home from '../../src/pages/home/Home';
import Login from '../../src/pages/login/Login';
import { Providers } from '../../src/Providers';

function renderReusable(initialEntries = ['/'], routes) {
    return render(
        <Providers>
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    {routes.map((route, index) => (
                        <Route path={route.path} element={route.element} key={index} />
                    ))}
                </Routes>
            </MemoryRouter>
        </Providers>,
    );
}

async function registerAccount(nickname, email, password) {
    await userEvent.type(await screen.findByTestId('reg-nickname-input'), nickname);
    await userEvent.type(await screen.findByTestId('reg-email-input'), email);
    await userEvent.type(await screen.findByTestId('reg-password-input'), password);
    await userEvent.type(await screen.findByTestId('reg-confirm-password-input'), password);

    await userEvent.click(await screen.findByRole('button'));

    await waitFor(() => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
}

async function loginUser(email, password) {
    await userEvent.type(await screen.findByTestId('email-input'), email);
    await userEvent.type(await screen.findByTestId('password-input'), password);

    await userEvent.click(await screen.findByRole('button'));
}

async function setupAuthedUser(email, password) {
    renderReusable(
        ['/login'],
        [
            { path: '/login', element: <Login /> },
            { path: '/home', element: <Home /> },
        ],
    );

    await loginUser(email, password);

    await waitFor(() => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
}

export { loginUser, registerAccount, renderReusable, setupAuthedUser };
