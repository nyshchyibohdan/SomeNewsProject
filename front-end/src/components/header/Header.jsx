import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/imgs/logo.png';
import { Navbar } from '../../components';

function Header() {
    return (
        <section className="header" data-testid="header_">
            <section className="header-logo">
                <Link className="header-logo-link" to="/home">
                    <img src={logo} className="header-logo-img" alt="logo" data-testid="header-logo-img-1" />
                </Link>
            </section>
            <section className="header-navbar" data-testid="navbar-section">
                <Navbar />
            </section>
        </section>
    );
}
export default Header;
