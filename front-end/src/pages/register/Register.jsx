import './Register.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { isAuthenticated } from '../../utils/auth';

const Register = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/home');
        }
    }, [navigate]);

    const registerSubmitted = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                nickname,
                email,
                password,
                confirmPassword,
            });
            localStorage.setItem('token', res.data.token);

            navigate('/home');
        } catch (error) {
            console.error(error);

            if (error.response && error.response.status === 400) {
                if (error.response.data.errors) {
                    const errorMessages = error.response.data.errors.map((err) => err.msg);
                    setError(errorMessages);
                } else {
                    setError([error.response.data.message]);
                }
            } else if (error.response && error.response.status === 500) {
                setError(['Something went wrong on the server!']);
            } else {
                setError(['An unexpected error occurred']);
            }
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Create account</h2>
            <form onSubmit={registerSubmitted} className={`register-form ${error.length > 0 ? 'form-error' : ''}`}>
                <div className="field">
                    <label className="field-label">Nickname</label>
                    <input
                        data-testid="cypress-reg-nickname-input"
                        className="input"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="field-label">Email</label>
                    <input
                        data-testid="cypress-reg-email-input"
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label className="field-label">Password</label>
                    <input
                        data-testid="cypress-reg-password-input"
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="field">
                    <label className="field-label">Confirm password</label>
                    <input
                        data-testid="cypress-reg-confirm-password-input"
                        className="input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="error-stack">
                    {error.length > 0 && (
                        <ul className="error">
                            {error.map((error_, index) => (
                                <li key={index}>{error_}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="register-button-link">
                    <Link className="link-to" to="/login">
                        Already have account?
                    </Link>
                    <button type="submit" className="register-button" data-testid="cypress-reg-button">
                        Create account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
