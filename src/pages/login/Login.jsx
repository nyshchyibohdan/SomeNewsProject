import './Login.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { isAuthenticated } from '../../utils/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/home');
        }
    }, [navigate]);

    const loginSubmitted = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);

            navigate('/home');
        } catch (error) {
            console.error(error);
            if (error.status === 500) {
                setError('Something went wrong!');
            }
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 data-testid="cypress-login-title" className="login-title">
                Login
            </h2>
            <form onSubmit={loginSubmitted} className="login-form">
                <div className="field email-field">
                    <label className="field-label email-field-title">Email</label>
                    <input
                        className="input email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="field password-field">
                    <label className="field-label password-field-label">Password</label>
                    <input
                        className="input password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="error-stack">{error && <p className="error">{error}</p>}</div>
                <div className="login-button-link">
                    <Link className="link-to" to="/register">
                        Don&apos;t have account?
                    </Link>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
