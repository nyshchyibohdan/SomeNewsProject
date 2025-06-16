import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useAuthContext } from '../contexts/AuthContext';
import { useUserArticlesContext } from '../contexts/UserArticlesContext';

export default function useFetchUserArticles() {
    const { userArticles, setUserArticles, setLoading, articlesModified, setArticlesModified } =
        useUserArticlesContext();
    const { user } = useAuthContext();
    const [noArticlesFound, setNoArticlesFound] = useState(false);

    const getUserArticles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/articles/get-articles', {
                params: { userId: user.id },
            });

            if (response.status === 204) {
                setUserArticles([]);
                setNoArticlesFound(true);
                console.log(response.status + ' No articles found');
            } else {
                setUserArticles(response.data);
                setNoArticlesFound(false);
                console.log('Articles found');
            }
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
        setArticlesModified(false);
    }, [setArticlesModified, setLoading, setUserArticles, user]);

    useEffect(() => {
        if (user.id && (userArticles.length === 0 || articlesModified) && !noArticlesFound) {
            getUserArticles();
        }
    }, [getUserArticles, user, userArticles, articlesModified, noArticlesFound]);
}
