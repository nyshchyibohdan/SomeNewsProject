import './Login.css';

import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);

            alert('Login successful!');
        } catch (error) {
            console.error(error);
            if(error.status === 500) {
                setError("Something went wrong!");
            }
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="form">
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
                <div className='error-stack'>{error && <p className='error'>{error}</p>}</div>
                <div className="button-link">
                    <Link className='link-to' to="/register">Don't have account?</Link>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
