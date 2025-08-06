import './Login.css';

import axios from 'axios';
import { useEffect, useState, type FormEvent } from 'react';

import { Link, useNavigate, useSearch } from '@tanstack/react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const search = useSearch({ from: '/login' });
    const [showSuccess, setShowSuccess] = useState(search.registered === 'true');

    const navigate = useNavigate();

    useEffect(() => {
        if (showSuccess) {
            const timeout = setTimeout(() => {
                setShowSuccess(false)
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [showSuccess]);

    const loginSubmitted = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });

            if (res.status === 200) {
                navigate({ to: '/' });
            }
        } catch (error: unknown) {
            console.error(error);
            if (
                typeof error === 'object' &&
                error !== null &&
                'status' in error
            ) {
                if (error.status === 500) {
                    setError('Something went wrong!');
                    return;
                }
            }
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="h-dvh flex flex-col gap-4 justify-center items-center bg-[#121417]">
            {showSuccess && <div className="bg-transparent border-2 border-[#293038] top-3 text-green-800 p-2 mb-4 rounded-[8px] absolute z-50 shadow-2xl">
                Account successfully created
            </div>}
            <h2 data-testid="login-title" className="text-center text-5xl font-bold m-5 mt-0">
                Login
            </h2>
            <form onSubmit={loginSubmitted} className="w-11/12 md:w-xl h-7/12 md:h-80 flex flex-col justify-center items-center border-2 border-[#293038] border-solid rounded-2xl pl-3 pr-3 md:pl-8 md:pr-8" >
                <div className="field email-field">
                    <label className="field-label email-field-title">Email</label>
                    <input
                        data-testid="email-input"
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
                        data-testid="password-input"
                        className="input password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="w-full flex flex-col">
                    {error && (
                        <p className="text-[#e74c3c] !text-[18px] font-bold pl-0" data-testid="error-msg">
                            {error}
                        </p>
                    )}
                </div>
                <div className="w-full h-auto pl-3 pr-3 md:pl-[80px] md:pr-[80px] flex flex-row justify-center items-center gap-[80px] md:mt-[20px] mt-[10px]">
                    <Link className="link-to" to="/register" data-testid="link-to">
                        Don&apos;t have account?
                    </Link>
                    <button type="submit" className="w-24 h-12">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
