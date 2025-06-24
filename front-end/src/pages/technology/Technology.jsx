import '../../components/newsPages/NewsPages.css';

import React from 'react';

import { NewsPages } from '../../components/index';

function Technology() {
    const apiRoute = 'http://localhost:5000/api/newsapi/?topic=technology';

    return (
        <div data-testid="technology-page">
            <NewsPages apiRoute={apiRoute} />
        </div>
    );
}

export default Technology;
