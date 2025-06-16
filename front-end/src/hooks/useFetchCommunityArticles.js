import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useCommunityContext } from '../contexts/CommunityContext';

export default function useFetchCommunityArticles() {
    const { communityArticles, setCommunityArticles, setLoading, setError, articleModified, setArticleModified } =
        useCommunityContext();
    const [noArticlesFound, setNoArticlesFound] = useState(false);

    const fetchCommunityArticles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/articles/community-articles');

            if (response.status === 204) {
                setCommunityArticles([]);
                setNoArticlesFound(true);
                console.log(response.status + ' No articles found');
            } else {
                setCommunityArticles(response.data.articles);
                setNoArticlesFound(false);
                console.log('Articles found');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching community articles:', error);
            setError(error);
        } finally {
            setLoading(false);
            setArticleModified(false);
        }
    }, [setCommunityArticles, setLoading, setError, setArticleModified]);

    useEffect(() => {
        if ((communityArticles.length === 0 || articleModified) && !noArticlesFound) {
            fetchCommunityArticles();
        }
    }, [fetchCommunityArticles, communityArticles, articleModified, noArticlesFound]);
}
