import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useAuthContext } from '../contexts/AuthContext';
import useUserRepostsContext from '../contexts/UserRepostsContext';

export default function useFetchUserReposts() {
    const { userReposts, setUserReposts, setLoading, repostsModified, setRepostsModified } = useUserRepostsContext();

    const { user } = useAuthContext();
    const [noArticlesFound, setNoArticlesFound] = useState(false);

    const getUserReposts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/articles/user-reposts', {
                params: { userId: user.id },
            });

            if (response.data.message === 'No articles found') {
                setUserReposts([]);
                setNoArticlesFound(true);
                console.log(response.data.message);
            } else {
                setUserReposts(response.data);
                setNoArticlesFound(false);
                console.log('Articles found');
            }
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
        setRepostsModified(false);
    }, [setRepostsModified, setLoading, setUserReposts, user]);

    useEffect(() => {
        if (user.id && (userReposts.length === 0 || repostsModified) && !noArticlesFound) {
            getUserReposts();
        }
    }, [getUserReposts, user, userReposts, repostsModified, noArticlesFound]);
}
