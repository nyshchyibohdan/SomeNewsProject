import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </>
        // <Login/>
    );
};

export default App;
