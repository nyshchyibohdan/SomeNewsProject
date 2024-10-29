import axios from 'axios';
import { useCallback, useEffect } from 'react';

import { useCommunityContext } from '../contexts/CommunityContext';

export default function useFetchCommunityArticles() {
    const { communityArticles, setCommunityArticles, setLoading, setError, articleModified, setArticleModified } =
        useCommunityContext();

    const fetchCommunityArticles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/articles/community-articles');
            setCommunityArticles(response.data.articles);
            console.log('Community Articles loaded');
        } catch (error) {
            console.error('Error fetching community articles:', error);
            setError(error);
        } finally {
            setLoading(false);
            setArticleModified(false);
        }
    }, [setCommunityArticles, setLoading, setError, setArticleModified]);

    useEffect(() => {
        if (communityArticles.length === 0 || articleModified) {
            fetchCommunityArticles();
        }
    }, [fetchCommunityArticles, communityArticles, articleModified]);
}
