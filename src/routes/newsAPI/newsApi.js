const express = require('express');
const axios = require('axios');

const router = express.Router();
require('dotenv').config();

const NEWS_API = process.env.NEWS_API;

router.get('/general', async (request, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                category: 'general',
                apiKey: NEWS_API,
            },
        });

        const articles = response.data.articles
            .map((article) => ({
                title: article.title,
                description: article.description,
                content: article.content,
                publishedAt: article.publishedAt,
                source: article.source,
                url: article.url,
                author: article.author,
                img: article.urlToImage,
            }))
            .filter((article) => {
                return article.title && article.description && article.url && !article.title.includes('[Removed]');
            });

        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching news articles' });
    }
});

router.get('/tech', async (request, res) => {
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
                source: article.source,
                url: article.url,
                author: article.author,
                img: article.urlToImage,
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

router.get('/sport', async (request, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                category: 'sport',
                apiKey: NEWS_API,
            },
        });

        const articles = response.data.articles
            .map((article) => ({
                title: article.title,
                description: article.description,
                content: article.content,
                publishedAt: article.publishedAt,
                source: article.source,
                url: article.url,
                author: article.author,
                img: article.urlToImage,
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

router.get('/science', async (request, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                category: 'science',
                apiKey: NEWS_API,
            },
        });

        const articles = response.data.articles
            .map((article) => ({
                title: article.title,
                description: article.description,
                content: article.content,
                publishedAt: article.publishedAt,
                source: article.source,
                url: article.url,
                author: article.author,
                img: article.urlToImage,
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
