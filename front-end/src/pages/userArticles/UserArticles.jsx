import './UserArticles.css';

import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import defaultPic from '../../assets/imgs/logo.png';
import { Footer, Header } from '../../components/index';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCommunityContext } from '../../contexts/CommunityContext';
import { useUserArticlesContext } from '../../contexts/UserArticlesContext';
import useUserLikesContext from '../../contexts/UserLikesContext';
import useUserRepostsContext from '../../contexts/UserRepostsContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import useFetchUserArticles from '../../hooks/useFetchUserArticles';

function UserArticles() {
    useAuthentication();
    useFetchUserArticles();
    const { user, loading } = useAuthContext();
    const { userArticles, setUserArticles } = useUserArticlesContext();
    const { setArticleModified } = useCommunityContext();
    const { setRepostsModified } = useUserRepostsContext();
    const { setLikesModified } = useUserLikesContext();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const deleteUserArticle = async (articleId) => {
        try {
            await axios
                .delete('http://localhost:5000/api/articles/delete-article', {
                    data: {
                        articleId: articleId,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        setUserArticles((prevArticles) => prevArticles.filter((article) => article._id !== articleId));
                        setArticleModified(true);
                        setRepostsModified(true);
                        setLikesModified(true);
                    } else {
                        console.log(response.data.message);
                    }
                });
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <BounceLoader className="loader" color="#ffffff" speedMultiplier={1} />;

    if (!user) {
        return <div>Error fetching user data</div>;
    }

    return (
        <div>
            <Header />
            <div className={'user-articles-page-container'}>
                <div className={'user-articles-page-title'}>
                    <p className={'user-articles-page-title-h1'}>Articles written by yourself</p>
                    <hr className={'horizontal-rule user-articles-page-title-rule'} />
                    <Link to="/new-article" className={'button link-to-page link-to-new-article'}>
                        New
                    </Link>
                </div>
                <div className={'user-articles-list-container'}>
                    <ul className="user-articles-list">
                        {userArticles && userArticles.length > 0 ? (
                            userArticles.map((article) => {
                                const imgSource = article.mainPicture ? article.mainPicture : defaultPic;
                                return (
                                    <li key={article._id} className="article-item">
                                        <div className="article-item-container">
                                            <h2 className="article-title">{article.title}</h2>
                                            <p className="article-desc">{article.description}</p>
                                            <div className={'article-buttons-container'}>
                                                <Link
                                                    className="button link-to-page"
                                                    to={`/user-full-article`}
                                                    state={article._id}
                                                >
                                                    Read more
                                                </Link>
                                                <button
                                                    className={'button delete-article-button'}
                                                    onClick={() => deleteUserArticle(article._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
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
                            <p>No articles found.</p>
                        )}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserArticles;
