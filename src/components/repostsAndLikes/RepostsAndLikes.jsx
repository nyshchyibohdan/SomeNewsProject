import './RepostsAndLikes.css';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import defaultPic from '../../assets/imgs/logo.png';

export default function RepostsAndLikes({ articles }) {
    return (
        <div className="user-articles-list-container">
            {articles && articles.length > 0 ? (
                <ul className="user-reposts-articles-list">
                    {articles.map((article) => {
                        const imgSource = article.mainPicture ? article.mainPicture : defaultPic;
                        return (
                            <li key={article._id} className="reposts-article-item">
                                <div className="reposts-article-item-container">
                                    <Link to={`/user-full-article`} className="user-reposts-link" state={article._id}>
                                        <img
                                            className={`reposts-article-item-img ${imgSource === defaultPic ? 'reposts-item-img-alt' : ''}`}
                                            src={imgSource}
                                            alt={article.title || 'Article Image'}
                                        />
                                        <div className="user-reposts-article-text">
                                            <h2 className="reposts-article-title">{article.title}</h2>
                                            <p className="reposts-article-desc">{article.description}</p>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
}

RepostsAndLikes.propTypes = {
    articles: PropTypes.array.isRequired,
};
