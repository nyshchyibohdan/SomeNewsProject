import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from '../../components';

function Header() {
    return (
        <section className="header">
            <section className='header-logo'><Link className='header-logo-link' to='/home'>Some news</Link></section>
            <section className='header-navbar'><Navbar /></section>
        </section>
    )
}
export default Header;