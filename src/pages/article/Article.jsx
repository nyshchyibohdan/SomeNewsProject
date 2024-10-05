import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Footer, Header } from '../../components';

const Article = () => {
    const { id } = useParams();
    const location = useLocation();
    const article = location.state?.article;

    if (!article) {
        return <p>No article data found</p>;
    }

    const handleContent = (article) => {
        if (article.content && article.content.includes('[+')) {
            return (
                <>
                    <p>{article.content.split('[+')[0]}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        Read more
                    </a>
                </>
            );
        }
        return <p>{article.content}</p>;
    }
    return (
        <div>
            <Header/>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            {handleContent(article)}
            <p>{article.author}</p>
            <Footer/>
        </div>
    );
};

export default Article;
