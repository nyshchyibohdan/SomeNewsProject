import './Register.css';

import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { nickname, email, password, confirmPassword });
            localStorage.setItem('token', res.data.token);

            alert('Register successful!');
        } catch(error) {
            console.error(error);
            if(error.status === 500) {
                setError(["Something went wrong!"]);
            }
            else{
                const errorMessages = error.response.data.errors.map(error_ => error_.msg);
                setError(errorMessages);
            }
        }
    };

    return (
        <div className="register-container">
            <h2 className='register-title'>Create account</h2>
            <form onSubmit={handleSubmit} className={`form ${error.length > 0 ? 'form-error' : ''}`}>
                <div className='field'>
                    <label className='field-label'>Nickname</label>
                    <input
                        className='input'
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}

                    />
                </div>
                <div className='field'>
                    <label className='field-label'>Email</label>
                    <input
                        className='input'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='field'>
                    <label className='field-label'>Password</label>
                    <input
                        className='input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='field'>
                    <label className='field-label'>Confirm password</label>
                    <input
                        className='input'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='error-stack'>
                    {error.length > 0 && (
                        <ul className='error'>
                            {error.map((error_, index) => (
                                <li key={index}>{error_}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='button-link'>
                    <Link className='link-to' to="/login">Already have account?</Link>
                    <button type="submit" className='register-button'>Create account</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
