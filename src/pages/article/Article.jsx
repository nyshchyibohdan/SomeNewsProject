import './Article.css';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer, Header } from '../../components';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const Article = () => {
    useIsAuthenticated();
    const location = useLocation();
    const article = location.state;

    useEffect(() => {
        window.scrollTo(0, 0);

        if (article) {
            console.log('Article retrieved:', article);
        } else {
            console.error('No articles found or invalid ID');
        }
    }, [article]);

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
