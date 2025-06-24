import '../../components/newsPages/NewsPages.css';

import React from 'react';

import { NewsPages } from '../../components/index';

function Home() {
    const apiRoute = 'http://localhost:5000/api/newsapi/?topic=general';

    return (
        <div data-testid="home-page">
            <NewsPages apiRoute={apiRoute} />
        </div>
    );
}

export default Home;
