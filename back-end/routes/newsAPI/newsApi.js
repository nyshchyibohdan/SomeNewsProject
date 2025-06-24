const express = require("express");
const axios = require("axios");

const router = express.Router();
require("dotenv").config();

const NEWS_API = process.env.NEWS_API;

router.get("/", async (request, res) => {
    const { topic } = request.query;

    if (
        topic != "general" &&
        topic != "technology" &&
        topic != "sport" &&
        topic != "science"
    ) {
        return res.status(400).send({ message: "No valid category provided" });
    }

    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines`,
            {
                params: {
                    category: topic,
                    apiKey: NEWS_API,
                },
            }
        );

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
                return (
                    article.title &&
                    article.description &&
                    article.url &&
                    !article.title.includes("[Removed]")
                );
            });

        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching news articles" });
    }
});

module.exports = router;
