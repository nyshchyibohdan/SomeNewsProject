import './Header.css';

import React from 'react';

import { Navbar } from '../../components';

function Header() {
    return (
        <section className="header">
            <section className='header-logo'>Some news</section>
            <section><Navbar /></section>
        </section>
    )
}
export default Header;