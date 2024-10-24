import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

import { useAuthContext } from './AuthContext';

const UserArticlesContext = createContext();

export const useUserArticlesContext = () => {
    return useContext(UserArticlesContext);
};

export const UserArticlesProvider = ({ children }) => {
    const [userArticles, setUserArticles] = useState([]);
    const [articlesModified, setArticlesModified] = useState(false);
    const { loading, setLoading } = useAuthContext();
    const [error, setError] = useState('');

    const removeArticles = () => {
        setUserArticles([]);
        setError('');
    };

    return (
        <UserArticlesContext.Provider
            value={{
                userArticles,
                setUserArticles,
                loading,
                setLoading,
                error,
                setError,
                articlesModified,
                setArticlesModified,
                removeArticles,
            }}
        >
            {children}
        </UserArticlesContext.Provider>
    );
};

UserArticlesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
