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
            <div className={'footer-links'}>
                <a
                    className="footer-link footer-git-link"
                    href="https://github.com/nyshchyibohdan/SomeNewsProject"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                <a
                    className={'footer-link footer-mail-to-link'}
                    href="mailto:nyshchyi.bohdan@student.uzhnu.edu.ua?subject=Mail topic&body=Mail text"
                >
                    Report problem
                </a>
            </div>
        </section>
    );
}

export default Footer;
