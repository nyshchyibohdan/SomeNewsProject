import express, { NextFunction, Request, Response } from "express";
import axios from "axios";
import { Article } from "../../types/types";
import createHttpError from "http-errors";

const router = express.Router();
require("dotenv").config();

const NEWS_API = process.env.NEWS_API;

router.get("/", async (request: Request, res: Response, next: NextFunction) => {
    const { topic } = request.query;

    if (
        topic != "general" &&
        topic != "technology" &&
        topic != "sport" &&
        topic != "science"
    ) {
        return next(createHttpError(400, "No valid category provided"));
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
        return next(createHttpError(500, "Error fetching news articles"));
    }
});

// module.exports = router;
export default router;
