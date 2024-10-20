import axios from 'axios';

export const getUser = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
                auth: localStorage.getItem('token'),
            },
        });
        return response.data.user;
    } catch (error) {
        console.error('Error getting user data', error);
        throw error;
    }
};
