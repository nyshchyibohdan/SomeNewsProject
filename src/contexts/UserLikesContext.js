import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

import { useAuthContext } from './AuthContext';

const UserLikesContext = createContext();

export default function useUserLikesContext() {
    return useContext(UserLikesContext);
}

export const UserLikesProvider = ({ children }) => {
    const [userLikes, setUserLikes] = useState([]);
    const { loading, setLoading } = useAuthContext();
    const [error, setError] = useState('');
    const [likesModified, setLikesModified] = useState(false);

    const removeLikes = () => {
        setUserLikes([]);
        setError('');
    };

    return (
        <UserLikesContext.Provider
            value={{
                userLikes,
                setUserLikes,
                loading,
                setLoading,
                error,
                setError,
                likesModified,
                setLikesModified,
                removeLikes,
            }}
        >
            {children}
        </UserLikesContext.Provider>
    );
};

UserLikesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
