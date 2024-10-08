import '../../components/newsPages/NewsPages.css';

import React from 'react';

import NewsPages from '../../components/newsPages/NewsPages';

function Technology() {
    const apiRoute = 'http://localhost:5000/api/newsapi/tech';

    return (
        <div>
            <NewsPages apiRoute={apiRoute} />
        </div>
    );
}

export default Technology;