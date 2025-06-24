import '../../components/newsPages/NewsPages.css';

import React from 'react';

import { NewsPages } from '../../components/index';

function Science() {
    const apiRoute = 'http://localhost:5000/api/newsapi/?topic=science';

    return (
        <div data-testid="science-page">
            <NewsPages apiRoute={apiRoute} />
        </div>
    );
}

export default Science;
