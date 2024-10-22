import './Navbar.css';

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import defaultProfilePic from '../../assets/imgs/logo.png';
import { logout } from '../../utils/auth';
import { getUser } from '../../utils/userService';

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        bio: '',
        profilePic: '',
    });
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const logoutUser = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchUserData();
    }, []);

    function checkpath() {
        if (currentPath !== '/profile') {
            return (
                <div className="dropdown-container">
                    <button className="dropdown-menu-button" onClick={toggleDropdown}>
                        <img className="navbar-avatar" src={user.profilePic || defaultProfilePic} />
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
