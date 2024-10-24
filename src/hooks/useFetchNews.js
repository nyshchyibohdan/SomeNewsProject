import axios from 'axios';
import { useEffect } from 'react';

import { useNewsApiContext } from '../contexts/NewsApiContext';

export default function useFetchNews({ apiRoute }) {
    const { news, setNews, setLoading, setError, route, setRoute } = useNewsApiContext();

    const fetchNews = async () => {
        if (news.length === 0 || !apiRoute.includes(route)) {
            setLoading(true);
            try {
                const response = await axios.get(apiRoute);

                setNews(response.data);
                setRoute(apiRoute);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchNews();
    }, [apiRoute]);
}
