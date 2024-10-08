import '../../components/newsPages/NewsPages.css';

import React from 'react';

import { NewsPages } from '../../components/index';

function Sport() {
    const apiRoute = 'http://localhost:5000/api/newsapi/sport';

    return (
        <div>
            <NewsPages apiRoute={apiRoute} />
        </div>
    );
}

export default Sport;