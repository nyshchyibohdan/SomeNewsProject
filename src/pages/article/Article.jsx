import './Article.css';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Footer, Header } from '../../components';
import { isAuthenticated } from '../../utils/auth';

const Article = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();
    // const location = useLocation();
    // const { news, index } = location.state;

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const news = JSON.parse(localStorage.getItem('news'));

        if (news && news[articleId]) {
            console.log('Article retrieved:', news[articleId]);
            setArticle(news[articleId]);
        } else {
            console.error('No articles found or invalid ID');
        }
    }, [articleId]);

    if (!article) {
        return <p>No article data found</p>;
    }

    const handleContent = (article) => {
        if (article.content && article.content.includes('[+')) {
            return (
                <>
                    <p>{article.content.split('[+')[0]}</p>
                    <a className="article-text-link" href={article.url} target="_blank" rel="noopener noreferrer">
                        Read more
                    </a>
                </>
            );
        }
        return <p>{article.content}</p>;
    };
    return (
        <div>
            <Header />
            <div className="article-container">
                <div className="article-title-button-container">
                    <p className="article-page-title">{article.title}</p>
                </div>

                <img className="article-img" src={article.img} alt="" />
                <div className="article-main-text">
                    <p className="article-text">{article.description}</p>
                    {handleContent(article)}
                </div>
                <div className="article-author-place">
                    <hr className="article-author-rule" />
                    <p className="article-author">{article.author}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Article;
