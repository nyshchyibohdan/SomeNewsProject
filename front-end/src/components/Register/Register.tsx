import { Link, useNavigate } from '@tanstack/react-router';
import './Register.css';

import axios, { AxiosError } from 'axios';
import { useState, type FormEvent } from 'react';

const Register = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string[]>([]);

    const navigate = useNavigate();

    const registerSubmitted = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                nickname,
                email,
                password,
                confirmPassword,
            });

            if (res.status === 201) {
                navigate({ to: '/login', search: { registered: 'true' } });
            }
        } catch (error) {
            console.error(error);

            const err = error as AxiosError;
            const errData = err.response?.data as { errors?: [{ msg: string }], message?: string };

            if (err.status === 400) {
                if (err.response && errData && "errors" in errData) {
                    const errorMessages = errData.errors?.map((err: { msg: string }) => err.msg);
                    setError(errorMessages!);
                } else if (errData && "message" in errData) {
                    setError([errData.message!]);
                }
            } else if (err.status === 500) {
                setError(['Something went wrong on the server!']);
            } else {
                setError(['An unexpected error occurred']);
            }
            return;
        }
    };

    return (
        <div className="h-dvh flex flex-col gap-3 justify-center items-center bg-[#121417]">
            <h2 className="text-center md:text-4xl text-2xl font-bold m-5 mt-0" data-testid="create-acc-title">
                Create account
            </h2>
            <form onSubmit={registerSubmitted} className={`w-11/12 md:w-xl h-11/12 md:h-9/12 flex flex-col justify-center items-center border-2 border-[#293038] rounded-2xl pl-3 pr-3 md:pl-8 md:pr-8 pt-3 pb-3`}>
                <div className="field">
                    <label className="field-label">Nickname</label>
                    <input
                        data-testid="reg-nickname-input"
                        className="input"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="field-label">Email</label>
                    <input
                        data-testid="reg-email-input"
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
                        data-testid="reg-password-input"
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
                        data-testid="reg-confirm-password-input"
                        className="input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="w-full flex flex-col">
                    {error.length > 0 && (
                        <ul className="text-[#e74c3c] text-[18px] font-bold pl-0">
                            {error.map((error_, index) => (
                                <li key={index} data-testid={`${index}-error`}>
                                    {error_}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-[60px] mt-[20px]">
                    <Link className="link-to w-1/2" to="/login">
                        Already have account?
                    </Link>
                    <button type="submit" className="w-1/2 h-auto md:h-12" data-testid="cypress-reg-button">
                        Create account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
