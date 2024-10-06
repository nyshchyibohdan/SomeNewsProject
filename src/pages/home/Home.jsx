import '../NewsPages.css';

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

                localStorage.setItem('news', JSON.stringify(response.data));

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
            <div className="container">
                <ul className={'news-list'}>
                    {news.map((article, index) => (
                        index === 0 ? (
                            <li key={index} className="main-news-item">
                                <div className="main-news-item-container">
                                    <img className="main-news-img" src={article.img} alt="" />
                                    <div className="main-text-button">
                                        <div className="main-item-text">
                                            <h2 className="main-article-title">{article.title}</h2>
                                            <p className="main-article-desc">{article.description}</p>
                                        </div>
                                        <Link className="news-item-button main-item-button"
                                              to={`/home/${index}`}
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <li key={index} className="news-item">
                                <div className="news-item-container">
                                    <p className="home-article-author">{article.author}</p>
                                    <h2 className="home-article-title">{article.title}</h2>
                                    <p className="article-desc">{article.description}</p>
                                    <Link className="news-item-button item-button" to={`/home/${index}`} state={article}>
                                        Read more
                                    </Link>
                                </div>
                                <img className='news-item-img' src={article.img} alt="" />
                            </li>
                        )
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default Home;