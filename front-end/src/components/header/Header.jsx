import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/imgs/logo.png';
import { Navbar } from '../../components';

function Header() {
    return (
        <section className="header">
            <section className="header-logo">
                <Link className="header-logo-link" to="/home">
                    <img src={logo} className="header-logo-img" alt="logo" />
                </Link>
            </section>
            <section className="header-navbar">
                <Navbar />
            </section>
        </section>
    );
}
export default Header;
