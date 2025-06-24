import './UserReposts.css';

import React from 'react';
import { BounceLoader } from 'react-spinners';

import { Footer, Header, RepostsAndLikes } from '../../components/index';
import { useAuthContext } from '../../contexts/AuthContext';
import useUserRepostsContext from '../../contexts/UserRepostsContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import useFetchUserReposts from '../../hooks/useFetchUserReposts';

function UserReposts() {
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
            <div className={'user-reposts-page-container'} data-testid="Reposts-page">
                <div className={'user-reposts-page-title'}>
                    <hr className={'horizontal-rule user-reposts-page-title-rule'} />
                    <p className={'user-reposts-page-count'}>
                        {userReposts.length} repost{`${userReposts.length > 1 ? 's' : ''}`}
                    </p>
                </div>
                <RepostsAndLikes articles={userReposts} />
            </div>
            <Footer />
        </div>
    );
}

export default UserReposts;
