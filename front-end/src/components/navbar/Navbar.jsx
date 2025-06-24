import './Navbar.css';

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import defaultProfilePic from '../../assets/imgs/logo.png';
import { useAuthContext } from '../../contexts/AuthContext';
import { useUserArticlesContext } from '../../contexts/UserArticlesContext';
import useUserLikesContext from '../../contexts/UserLikesContext';
import useUserRepostsContext from '../../contexts/UserRepostsContext';
import { logout } from '../../utils/auth';

function Navbar() {
    const { user, removeUser } = useAuthContext();
    const { removeArticles } = useUserArticlesContext();
    const { removeReposts } = useUserRepostsContext();
    const { removeLikes } = useUserLikesContext();

    const [showDropdown, setShowDropdown] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const logoutUser = () => {
        logout();
        removeUser();
        removeArticles();
        removeReposts();
        removeLikes();
        navigate('/login');
    };

    function checkpath() {
        if (currentPath !== '/profile') {
            return (
                <div className="dropdown-container" data-testid="dropdown-container-test">
                    <button
                        className="dropdown-menu-button"
                        onClick={toggleDropdown}
                        data-testid="dropdown-container-button"
                    >
                        <img className="navbar-avatar" src={user?.profilePic || defaultProfilePic} />
                    </button>
                    {showDropdown && (
                        <ul className="dropdown-menu" data-testid="drop-menu">
                            <li>
                                <Link className="link profile-link" to="/profile">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button className="logout-button" onClick={logoutUser}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            );
        }
    }

    return (
        <div className="navbar" data-testid="nav-container">
            <Link
                className={`link ${currentPath === '/' || currentPath === '/home' ? 'link-current' : ''} link-home`}
                to="/"
            >
                Home
            </Link>
            <Link
                className={`link ${currentPath === '/tech' ? 'link-current' : ''} link-tech`}
                to="/tech"
                name="Technology"
            >
                Technology
            </Link>
            <Link
                className={`link ${currentPath === '/sport' ? 'link-current' : ''} link-sport`}
                to="/sport"
                name="Sport"
            >
                Sport
            </Link>
            <Link
                className={`link ${currentPath === '/science' ? 'link-current' : ''} link-science`}
                to="/science"
                name="Science"
            >
                Science
            </Link>
            <Link
                className={`link ${currentPath === '/community' ? 'link-current' : ''} link-reposts`}
                to="/community"
                name="Community"
            >
                Community
            </Link>
            {checkpath()}
        </div>
    );
}

export default Navbar;
