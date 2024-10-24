import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isAuthenticated } from '../utils/auth';

export default function useIsAuthenticated() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);
}
