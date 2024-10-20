const express = require('express');
const Article = require('../../../src/models/Article');
const User = require('../../../src/models/User');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

router.post('/save-article', async (req, res) => {
    const { title, description, mainPicture, content, author } = req.body;

    try {
        const articleDoc = await Article.create({
            title,
            description,
            mainPicture,
            content,
            author,
        });
        const article = await articleDoc.save();

        console.log(article);
        console.log('All done!');
        return res.status(200).json({ success: true, message: 'Article saved successfully' });
    } catch {
        res.status(400).json({ success: false, message: 'Failed to create article' });
    }
});

router.get('/get-articles', async (req, res) => {
    const userId = req.query.userId;

    try {
        const articles = await Article.find({ author: userId }).sort({ createdAt: -1 }).limit(10);

        if (articles.length === 0) {
            return res.status(200).json({
                message: 'No articles found',
                articles: [],
            });
        }
        return res.status(200).json(articles);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Failed to get articles from the database',
        });
    }
});

router.delete('/delete-article', async (req, res) => {
    const { articleId } = req.body;

    try {
        const article = await Article.findByIdAndDelete(articleId);
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'No article found with this ID',
            });
        }
        console.log('deleted');
        return res.status(200).json({
            success: true,
            message: 'Article deleted successfully',
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

module.exports = router;