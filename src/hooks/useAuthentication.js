import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';
import { getUser } from '../utils/userService';
import useIsAuthenticated from './useIsAuthenticated';

export const useAuthentication = () => {
    useIsAuthenticated();
    const navigate = useNavigate();
    const { user, setUser, setLoading } = useAuthContext();

    const fetchUserData = async () => {
        if (!user || user.nickname.length === 0) {
            setLoading(true);
            try {
                const userData = await getUser();
                setUser(userData);
                console.log('Found user');
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user, navigate, setUser, setLoading]);
};
