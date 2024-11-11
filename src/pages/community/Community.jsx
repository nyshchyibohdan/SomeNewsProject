import './Community.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import defaultPic from '../../assets/imgs/logo.png';
import { Footer, Header } from '../../components';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCommunityContext } from '../../contexts/CommunityContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import useFetchCommunityArticles from '../../hooks/useFetchCommunityArticles';

function Community() {
    useAuthentication();
    useFetchCommunityArticles();
    const { error } = useAuthContext();
    const { communityArticles, loading } = useCommunityContext();

    if (loading) return <BounceLoader className="loader" color="#ffffff" speedMultiplier={1} />;
    if (error) return <p>Error loading news: {error.message}</p>;

    return (
        <div>
            <Header />
            <div className="container community-container">
                <ul className={'news-list'}>
                    {communityArticles && communityArticles.length > 0 ? (
                        communityArticles.map((article, index) => {
                            const imgSource = article.mainPic ? article.mainPic : defaultPic;

                            return index === 0 ? (
                                <li key={index} className="main-news-item">
                                    <div className="main-news-item-container">
                                        <img
                                            className={`main-news-img ${imgSource === defaultPic ? 'main-news-img-alt' : ''}`}
                                            src={imgSource}
                                            alt=""
                                        />
                                        <div className="main-text-button">
                                            <div className="main-item-text">
                                                <h2 className="main-article-title">{article.title}</h2>
                                                <p className="main-article-desc">{article.description}</p>
                                            </div>
                                            <Link
                                                className="news-item-button main-item-button"
                                                to={`/user-full-article`}
                                                state={article.id}
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
                                        <Link
                                            className="news-item-button item-button"
                                            to={`/user-full-article`}
                                            state={article.id}
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                    <img
                                        className={`article-item-img ${imgSource === defaultPic ? 'article-item-img-alt' : ''}`}
                                        src={imgSource}
                                        alt={article.title || 'Article Image'}
                                    />
                                </li>
                            );
                        })
                    ) : (
                        <p>No community articles found</p>
                    )}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default Community;
