import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

const NewsApiContext = createContext();

export const useNewsApiContext = () => {
    return useContext(NewsApiContext);
};

export const NewsApiProvider = ({ children }) => {
    const [route, setRoute] = useState('home');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <NewsApiContext.Provider value={{ news, setNews, loading, setLoading, error, setError, route, setRoute }}>
            {children}
        </NewsApiContext.Provider>
    );
};

NewsApiProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
