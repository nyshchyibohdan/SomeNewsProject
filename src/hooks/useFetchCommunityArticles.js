import axios from 'axios';
import { useEffect } from 'react';

import { useCommunityContext } from '../contexts/CommunityContext';

export default function useFetchCommunityArticles() {
    const { communityArticles, setCommunityArticles, setLoading, setError, articleModified, setArticleModified } =
        useCommunityContext();

    const fetchCommunityArticles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/articles/community-articles');

            setCommunityArticles(response.data.articles);
            console.log('Community Articles loaded');
            setLoading(false);
        } catch (error) {
            console.error('Error fetching community articles:', error);
            setError(error);
            setLoading(false);
        }
        setArticleModified(false);
    };

    useEffect(() => {
        if (communityArticles.length === 0 || articleModified) {
            fetchCommunityArticles();
        }
    }, [communityArticles]);
}
