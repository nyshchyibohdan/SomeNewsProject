import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { nickname, email, password, confirmPassword });
            localStorage.setItem('token', res.data.token);

            alert('Register successful!');
        } catch(error) {
            console.error(error);
            if(error.status === 500) {
                setError("Something went wrong!");
            }
            else{
                const errorMessages = error.response.data.errors.map(error_ => error_.msg);
                setError(errorMessages);
            }
        }
    };

    return (
        <div>
            <h2>Create account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nickname</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}

                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error.length > 0 && (
                    <ul style={{ color: 'red', listStyle: 'none', paddingLeft: 0 }}>
                        {error.map((error_, index) => (
                            <li key={index}>{error_}</li>
                        ))}
                    </ul>
                )}
                <button type="submit">Create account</button>
            </form>
        </div>
    );
};

export default Register;
