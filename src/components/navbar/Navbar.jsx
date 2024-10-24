import './Navbar.css';

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import defaultProfilePic from '../../assets/imgs/logo.png';
import { useAuthContext } from '../../contexts/AuthContext';
import { useUserArticlesContext } from '../../contexts/UserArticlesContext';
import { logout } from '../../utils/auth';

function Navbar() {
    const { user, removeUser } = useAuthContext();
    const { removeArticles } = useUserArticlesContext();

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
        navigate('/login');
    };

    function checkpath() {
        if (currentPath !== '/profile') {
            return (
                <div className="dropdown-container">
                    <button className="dropdown-menu-button" onClick={toggleDropdown}>
                        <img className="navbar-avatar" src={user?.profilePic || defaultProfilePic} />
                    </button>
                    {showDropdown && (
                        <ul className="dropdown-menu">
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
        <div className="navbar">
            <Link
                className={`link ${currentPath === '/' || currentPath === '/home' ? 'link-current' : ''} link-home`}
                to="/"
            >
                Home
            </Link>
            <Link className={`link ${currentPath === '/tech' ? 'link-current' : ''} link-tech`} to="/tech">
                Technology
            </Link>
            <Link className={`link ${currentPath === '/sport' ? 'link-current' : ''} link-sport`} to="/sport">
                Sport
            </Link>
            <Link className={`link ${currentPath === '/science' ? 'link-current' : ''} link-science`} to="/science">
                Science
            </Link>
            <Link className={`link ${currentPath === '/community' ? 'link-current' : ''} link-reposts`} to="/community">
                Community
            </Link>
            {checkpath()}
        </div>
    );
}

export default Navbar;
