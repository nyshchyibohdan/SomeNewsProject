import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

import { useAuthContext } from './AuthContext';

const userRepostsContext = createContext();

export default function useUserRepostsContext() {
    return useContext(userRepostsContext);
}

export const UserRepostsContextProvider = ({ children }) => {
    const [userReposts, setUserReposts] = useState([]);
    const { loading, setLoading } = useAuthContext();
    const [error, setError] = useState('');
    const [repostsModified, setRepostsModified] = useState(false);

    const removeReposts = () => {
        setUserReposts([]);
        setError('');
    };

    return (
        <userRepostsContext.Provider
            value={{
                userReposts,
                setUserReposts,
                loading,
                setLoading,
                error,
                setError,
                repostsModified,
                setRepostsModified,
                removeReposts,
            }}
        >
            {children}
        </userRepostsContext.Provider>
    );
};

UserRepostsContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
