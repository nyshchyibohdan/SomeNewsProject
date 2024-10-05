import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import { Footer, Header } from '../../components';
import { isAuthenticated } from '../../utils/auth';

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/newsapi/general');
                setNews(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <p>Loading news...</p>;
    if (error) return <p>Error loading news: {error.message}</p>;

    return (
        <div>
            <Header />
            <h1>Top News</h1>
            <ul>
                {news.map((article, index) => (
                    <li key={index}>
                        <Link to={`/home/${index}`} state={{ article }}>
                            <h2>{article.title}</h2>
                        </Link>
                        <p>{article.description}</p>
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    )
}

export default Home;