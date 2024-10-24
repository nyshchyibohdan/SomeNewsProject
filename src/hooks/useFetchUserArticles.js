import axios from 'axios';
import { useEffect } from 'react';

import { useAuthContext } from '../contexts/AuthContext';
import { useUserArticlesContext } from '../contexts/UserArticlesContext';

export default function useFetchUserArticles() {
    const { userArticles, setUserArticles, setLoading, articlesModified, setArticlesModified } =
        useUserArticlesContext();
    const { user } = useAuthContext();

    const getUserArticles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/articles/get-articles', {
                params: { userId: user.id },
            });

            if (response.data.message === 'No articles found') {
                setUserArticles([]);
                console.log(response.data.message);
            } else {
                setUserArticles(response.data);
                console.log('Articles found');
            }
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
        setArticlesModified(false);
    };

    useEffect(() => {
        if ((user.id && userArticles.length === 0) || articlesModified) {
            getUserArticles();
        }
    }, [user]);
}
