import PropTypes from 'prop-types';
import React from 'react';

import { AuthProvider } from './contexts/AuthContext';
import { CommunityProvider } from './contexts/CommunityContext';
import { NewsApiProvider } from './contexts/NewsApiContext';
import { UserArticlesProvider } from './contexts/UserArticlesContext';
import { UserLikesProvider } from './contexts/UserLikesContext';
import { UserRepostsContextProvider } from './contexts/UserRepostsContext';

export function Providers({ children }) {
    return (
        <AuthProvider>
            <NewsApiProvider>
                <UserArticlesProvider>
                    <CommunityProvider>
                        <UserRepostsContextProvider>
                            <UserLikesProvider>{children}</UserLikesProvider>
                        </UserRepostsContextProvider>
                    </CommunityProvider>
                </UserArticlesProvider>
            </NewsApiProvider>
        </AuthProvider>
    );
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
};
