import './Navbar.css';

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <Link className="link link-home" to="/">
                Home
            </Link>
            <Link className="link link-technology" to="/tech">
                Technology
            </Link>
            <Link className="link link-sport" to="/sport">
                Sport
            </Link>
            <Link className="link link-politics" to="/science">
                Science
            </Link>
            <Link className="link link-reposts" to="/">Reposts</Link>
            <Link to=''>
                <img
                    className="navbar-avatar"
                    // src={}
                />
            </Link>
        </div>
    );
}

export default Navbar;
