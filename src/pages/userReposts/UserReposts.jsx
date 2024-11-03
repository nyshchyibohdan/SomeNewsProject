import './UserReposts.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import defaultPic from '../../assets/imgs/logo.png';
import { Footer, Header } from '../../components/index';
import { useAuthContext } from '../../contexts/AuthContext';
import useUserRepostsContext from '../../contexts/UserRepostsContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import useFetchUserReposts from '../../hooks/useFetchUserReposts';

function UserArticles() {
    useAuthentication();
    const { user, loading } = useAuthContext();

    useFetchUserReposts();
    const { userReposts } = useUserRepostsContext();

    if (loading) return <BounceLoader className="loader" color="#ffffff" speedMultiplier={1} />;

    if (!user) {
        return <div>Error fetching user data</div>;
    }
    return (
        <div>
            <Header />
            <div className={'user-reposts-page-container'}>
                <div className={'user-reposts-page-title'}>
                    <hr className={'horizontal-rule user-reposts-page-title-rule'} />
                    <p className={'user-reposts-page-count'}>
                        {userReposts.length} repost{`${userReposts.length > 1 ? 's' : ''}`}
                    </p>
                </div>
                <div className={'user-articles-list-container'}>
                    <ul className="user-reposts-articles-list">
                        {userReposts && userReposts.length > 0 ? (
                            userReposts.map((article) => {
                                const imgSource = article.mainPicture ? article.mainPicture : defaultPic;
                                return (
                                    <li key={article._id} className="reposts-article-item">
                                        <div className="reposts-article-item-container">
                                            <Link
                                                to={`/user-full-article`}
                                                className={'user-reposts-link'}
                                                state={article._id}
                                            >
                                                <img
                                                    className={`reposts-article-item-img ${imgSource === defaultPic ? 'reposts-item-img-alt' : ''}`}
                                                    src={imgSource}
                                                    alt={article.title || 'Article Image'}
                                                />
                                                <div className={'user-reposts-article-text'}>
                                                    <h2 className="reposts-article-title">{article.title}</h2>
                                                    <p className="reposts-article-desc">{article.description}</p>
                                                </div>
                                            </Link>
                                        </div>
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
