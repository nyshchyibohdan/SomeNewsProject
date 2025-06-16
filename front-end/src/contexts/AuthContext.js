import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        bio: '',
        profilePic: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const removeUser = () => {
        setUser(null);
        setLoading(true);
        setError('');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, error, setError, removeUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
