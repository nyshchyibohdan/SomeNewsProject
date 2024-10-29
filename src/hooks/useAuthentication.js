import { useCallback, useEffect } from 'react';

import { useAuthContext } from '../contexts/AuthContext';
import { getUser } from '../utils/userService';
import useIsAuthenticated from './useIsAuthenticated';

export const useAuthentication = () => {
    useIsAuthenticated();
    const { user, setUser, setLoading } = useAuthContext();

    const fetchUserData = useCallback(async () => {
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
    }, [user, setUser, setLoading]);

    useEffect(() => {
        fetchUserData();
        window.scrollTo(0, 0);
    }, [fetchUserData]);
};
