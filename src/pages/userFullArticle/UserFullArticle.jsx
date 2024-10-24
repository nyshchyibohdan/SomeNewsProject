import './UserFullArticle.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import { Footer, Header } from '../../components';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCommunityContext } from '../../contexts/CommunityContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import { isAuthenticated } from '../../utils/auth';
import { getUser } from '../../utils/userService';

const UserFullArticle = () => {
    useAuthentication();
    const { user, setUser } = useAuthContext();
    const { setArticleModified } = useCommunityContext();
    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState({
        id: null,
        title: '',
        description: '',
        mainPic: '',
        content: '',
        author: '',
        repostsCount: 0,
    });
    const [articleReposted, setArticleReposted] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    const userArticleId = location.state;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user.reposts.includes(userArticleId)) {
                    setArticleReposted(true);
                }
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    });

    useEffect(() => {
        const fetchUserArticle = async () => {
            try {
                const articleData = await axios.get('http://localhost:5000/api/articles/user-full-article', {
                    params: {
                        articleId: userArticleId,
                    },
                });
                setArticle(articleData.data.article);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };

        window.scrollTo(0, 0);
        fetchUserArticle();
    }, [userArticleId]);

    const toggleRepostArticle = async (event) => {
        event.preventDefault();

        if (!user) return;

        try {
            const response = await axios.put('http://localhost:5000/api/articles/toggle-repost-article', {
                articleId: userArticleId,
                userId: user.id,
            });
            setArticleReposted(!articleReposted);
            setUser(response.data.user);
            setArticle(response.data.article);
            setArticleModified(true);
        } catch (error) {
            console.log(error.message);
            setArticleReposted(!articleReposted);
        }
    };

    if (userArticleId.length === 0) {
        return <p>Error getting article id</p>;
    }

    if (!article) {
        return <p>No article data found</p>;
    }

    if (loading) return <BounceLoader className="loader" color="#ffffff" speedMultiplier={1} />;

    if (!user) {
        return <div>Error fetching user data</div>;
    }

    if (!article) {
        return <div>Error fetching article data</div>;
    }

    return (
        <div>
            <Header />
            <div className="article-container">
                <div className="article-title-button-container">
                    <p className="article-title">{article.title}</p>
                    <div className="article-buttons">
                        <h2 className="article-reposts-counter">
                            {article.repostsCount} Repost{article.repostsCount === 1 ? '' : 's'}
                        </h2>
                        <button
                            className={`article-button article-repost-button ${articleReposted ? 'article-button-active' : ''}`}
                            onClick={toggleRepostArticle}
                        >
                            Repost{articleReposted ? 'ed' : ''}
                        </button>
                        <button className="article-button article-like-button">Like</button>
                    </div>
                </div>

                {!article.mainPic && <hr className={'horizontal-separator'}></hr>}

                <img className="article-img" src={article.mainPic} alt="" />
                <div className="article-main-text" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                <div className="article-author-place">
                    <hr className="article-author-rule" />
                    <p className="article-author">{article.author}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserFullArticle;
