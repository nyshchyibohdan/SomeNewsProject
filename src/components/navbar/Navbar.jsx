import './Navbar.css';

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <Link className="link-home" to="/">
                Home
            </Link>
            <Link className="link-home" to="/">
                Technology
            </Link>
            <Link className="link-home" to="/">
                Sport
            </Link>
            <Link className="link-home" to="/">
                Politics
            </Link>
        </div>
    );
}

export default Navbar;
