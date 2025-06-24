import '../../components/newsPages/NewsPages.css';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import defaultPic from '../../assets/imgs/logo.png';
import { useNewsApiContext } from '../../contexts/NewsApiContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import useFetchNews from '../../hooks/useFetchNews';
import { Footer, Header } from '../index';

NewsPages.propTypes = {
    apiRoute: PropTypes.string.isRequired,
};

function NewsPages({ apiRoute }) {
    useAuthentication();

    useFetchNews({ apiRoute });

    const { news, loading, error } = useNewsApiContext();

    if (loading) return <BounceLoader className="loader" color="#ffffff" speedMultiplier={1} />;
    if (error) return <p>Error loading news: {error.message}</p>;

    return (
        <div>
            <Header />
            <div className="container">
                <ul className="news-list" data-testid="news-list">
                    {news.map((article, index) => {
                        const imgSource = article.img ? article.img : defaultPic;

                        return index === 0 ? (
                            <li key={index} className="main-news-item">
                                <div className="main-news-item-container" data-testid="main-news-item">
                                    <img
                                        className={`main-news-img ${imgSource === defaultPic ? 'main-news-img-alt' : ''}`}
                                        src={imgSource}
                                        alt="img"
                                        data-testid="test-image"
                                    />
                                    <div className="main-text-button">
                                        <div className="main-item-text">
                                            <h2 className="main-article-title" data-testid="main-article-title">
                                                {article.title}
                                            </h2>
                                            <p className="main-article-desc">{article.description}</p>
                                        </div>
                                        <Link
                                            className="news-item-button main-item-button"
                                            to={`/${index}`}
                                            state={article}
                                            data-testid="test-item-link"
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <li key={index} className="other-news-item" data-testid="other-news-item">
                                <div className="news-item-container" data-testid="news-item">
                                    <p className="home-article-author">{article.author}</p>
                                    <h2 className="home-article-title" data-testid="home-article-title">
                                        {article.title}
                                    </h2>
                                    <p className="article-desc">{article.description}</p>
                                    <Link
                                        className="news-item-button item-button"
                                        to={`/${index}`}
                                        state={article}
                                        data-testid="test-item-link"
                                    >
                                        Read more
                                    </Link>
                                </div>
                                <img
                                    className={`news-item-img ${imgSource === defaultPic ? 'news-item-img-alt' : ''}`}
                                    src={imgSource}
                                    alt="img"
                                    data-testid="test-image"
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default NewsPages;
