import './UserArticles.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import defaultPic from '../../assets/imgs/logo.png';
import { Footer, Header } from '../../components/index';
import { isAuthenticated } from '../../utils/auth';
import { getUser } from '../../utils/userService';

function UserArticles() {
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        bio: '',
        profilePic: '',
    });
    const [userArticles, setUserArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.log(error.message);
            }
        };

        if (isAuthenticated()) {
            fetchUserData();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (user.id) {
            getUserArticles();
        }
    }, [user.id]);

    const getUserArticles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/articles/get-articles', {
                params: { userId: user.id },
            });

            if (response.data.message === 'No articles found') {
                setUserArticles([]);
                console.log(response.data.message);
            } else {
                setUserArticles(response.data);
                console.log(response.data.message);
            }
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };

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
                    <Link to="/new-article" className={'button link-to-page'}>
                        New
                    </Link>
                </div>
                <div className={'user-articles-list-container'}>
                    <ul className="user-articles-list">
                        {userArticles.map((article) => {
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
                        })}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserArticles;
