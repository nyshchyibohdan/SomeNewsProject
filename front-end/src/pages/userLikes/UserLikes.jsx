import './UserLikes.css';

import React from 'react';
import { BounceLoader } from 'react-spinners';

import { Footer, Header, RepostsAndLikes } from '../../components/index';
import { useAuthContext } from '../../contexts/AuthContext';
import useUserLikesContext from '../../contexts/UserLikesContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import useFetchUserLikes from '../../hooks/useFetchUserLikes';

function UserLikes() {
    useAuthentication();
    const { user, loading } = useAuthContext();

    useFetchUserLikes();
    const { userLikes } = useUserLikesContext();

    if (loading) return <BounceLoader className="loader" color="#ffffff" speedMultiplier={1} />;

    if (!user) {
        return <div>Error fetching user data</div>;
    }
    return (
        <div>
            <Header />
            <div className={'user-reposts-page-container'} data-testid="Likes-page">
                <div className={'user-reposts-page-title'}>
                    <hr className={'horizontal-rule user-reposts-page-title-rule'} />
                    <p className={'user-reposts-page-count'}>
                        {userLikes.length} like{`${userLikes.length > 1 ? 's' : ''}`}
                    </p>
                </div>
                <RepostsAndLikes articles={userLikes} />
            </div>
            <Footer />
        </div>
    );
}

export default UserLikes;
