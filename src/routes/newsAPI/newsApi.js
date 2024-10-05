const express = require('express');
const axios = require('axios');

const router = express.Router();
require('dotenv').config();

const NEWS_API = process.env.NEWS_API;

router.get('/general', async (request, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                category: 'technology',
                apiKey: NEWS_API,
            },
        });

        const articles = response.data.articles
            .map((article) => ({
                title: article.title,
                description: article.description,
                content: article.content,
                publishedAt: article.publishedAt,
                source: article.source.name,
                url: article.url,
                author: article.author,
            }))
            .filter((article) => {
                if (!article.title.includes('[Removed]')) {
                    return article.title && article.description && article.url;
                }
            });

        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching news articles' });
    }
});

module.exports = router;
