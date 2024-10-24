import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

import { useAuthContext } from './AuthContext';

const CommunityContext = createContext();

export const useCommunityContext = () => {
    return useContext(CommunityContext);
};

export const CommunityProvider = ({ children }) => {
    const [communityArticles, setCommunityArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [articleModified, setArticleModified] = useState(false);
    const { error, setError } = useAuthContext();

    return (
        <CommunityContext.Provider
            value={{
                communityArticles,
                setCommunityArticles,
                loading,
                setLoading,
                error,
                setError,
                articleModified,
                setArticleModified,
            }}
        >
            {children}
        </CommunityContext.Provider>
    );
};

CommunityProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
