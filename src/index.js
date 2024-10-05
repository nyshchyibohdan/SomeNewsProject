import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Article from './pages/article/Article';
// import App from './App';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <div>404 Not found</div>
    },
    {
        path: '/home',
        element: <Home />,
        errorElement: <div>404 Not found</div>
    },
    {
        path: '/home/:articleId/',
        element: <Article />,
        errorElement: <div>404 Not found</div>
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <div>404 Not found</div>
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <div>404 Not found</div>
    }
]);

ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
