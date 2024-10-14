import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Invalid token:', error);
        return false;  
    }
};

export const logout = () => {
    localStorage.clear();
};
