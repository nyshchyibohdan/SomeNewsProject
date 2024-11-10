import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useAuthContext } from '../contexts/AuthContext';
import useUserLikesContext from '../contexts/UserLikesContext';

export default function useFetchUserLikes() {
    const { userLikes, setUserLikes, setLoading, likesModified, setLikesModified } = useUserLikesContext();

    const { user } = useAuthContext();
    const [noArticlesFound, setNoArticlesFound] = useState(false);

    const getUserLikes = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/articles/user-likes', {
                params: { userId: user.id },
            });

            if (response.data.message === 'No articles found') {
                setUserLikes([]);
                setNoArticlesFound(true);
                console.log(response.data.message);
            } else {
                setUserLikes(response.data);
                setNoArticlesFound(false);
                console.log('Articles found');
            }
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
        setLikesModified(false);
    }, [setLikesModified, setLoading, setUserLikes, user]);

    useEffect(() => {
        if (user.id && (userLikes.length === 0 || likesModified) && !noArticlesFound) {
            getUserLikes();
        }
    }, [getUserLikes, user, userLikes, likesModified, noArticlesFound]);
}
