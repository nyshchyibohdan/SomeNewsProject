import '../../components/newsPages/NewsPages.css';

import React from 'react';

import NewsPages from '../../components/newsPages/NewsPages';

function Science() {
    const apiRoute = 'http://localhost:5000/api/newsapi/science';

    return (
        <div>
            <NewsPages apiRoute={apiRoute} />
        </div>
    );
}

export default Science;