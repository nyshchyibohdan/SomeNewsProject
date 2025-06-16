import '../../components/newsPages/NewsPages.css';

import React from 'react';

import { NewsPages } from '../../components/index';

function Home() {
    const apiRoute = 'http://localhost:5000/api/newsapi/general';

    return (
        <div>
            <NewsPages apiRoute={apiRoute} />
        </div>
    );
}

export default Home;
