import './Footer.css';

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <section className="footer">
            <section className="footer-logo">
                <Link className="footer-logo-link" to="/home">
                    Some news
                </Link>
            </section>
        </section>
    );
}
export default Footer;
