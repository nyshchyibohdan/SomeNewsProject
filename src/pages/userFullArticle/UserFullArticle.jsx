import './UserFullArticle.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import { Footer, Header } from '../../components';
import { isAuthenticated } from '../../utils/auth';
import { getUser } from '../../utils/userService';

const UserFullArticle = () => {
    const { userArticleId } = useParams();
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        bio: '',
        profilePic: '',
    });
    const [article, setArticle] = useState({
        id: null,
        title: '',
        description: '',
        mainPic: '',
        content: '',
        author: '',
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };

        if (isAuthenticated()) {
            fetchUserData();
        } else {
            navigate('/login');
        }
    }, [navigate]);

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
                        <h2 className="article-reposts-counter">500000 reposts</h2>
                        <button className="article-button article-repost-button">Repost</button>
                        <button className="article-button article-like-button">Like</button>
                    </div>
                </div>

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
