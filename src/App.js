import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Article from './pages/article/Article';
import Community from './pages/community/Community';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NewArticle from './pages/newArticle/NewArticle';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Science from './pages/science/Science';
import Sport from './pages/sport/Sport';
import Technology from './pages/technology/Technology';
import UserArticles from './pages/userArticles/UserArticles';
import UserFullArticle from './pages/userFullArticle/UserFullArticle';
import UserReposts from './pages/userReposts/UserReposts';
import { Providers } from './Providers';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/:articleId',
        element: <Article />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/home',
        element: <Home />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/tech',
        element: <Technology />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/sport',
        element: <Sport />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/science',
        element: <Science />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/profile',
        element: <Profile />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/new-article',
        element: <NewArticle />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/user-articles',
        element: <UserArticles />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/user-full-article',
        element: <UserFullArticle />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/community',
        element: <Community />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/user-reposts',
        element: <UserReposts />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <div>404 Not found</div>,
    },
]);

function App() {
    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    );
}

export default App;
