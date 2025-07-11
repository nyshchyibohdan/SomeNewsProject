import express, { Request, Response } from "express";
import axios from "axios";
import { Article } from "../../types/types";

const router = express.Router();
require("dotenv").config();

const NEWS_API = process.env.NEWS_API;

router.get("/", async (request: Request, res: Response) => {
    const { topic } = request.query;

    if (
        topic != "general" &&
        topic != "technology" &&
        topic != "sport" &&
        topic != "science"
    ) {
        res.status(400).send({ message: "No valid category provided" });
        return;
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
            .map((article: Article) => ({
                title: article.title,
                description: article.description,
                content: article.content,
                publishedAt: article.publishedAt,
                source: article.source,
                url: article.url,
                author: article.author,
                img: article.urlToImage,
            }))
            .filter((article: Article) => {
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
        return;
    }
});

// module.exports = router;
export default router;
