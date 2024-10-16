const express = require('express');
const Article = require('../../../src/models/Article');

const router = express.Router();

router.post('/save-article', async (req, res) => {
    const { title, mainPicture, content, author } = req.body;

    try {
        const articleDoc = await Article.create({
            title,
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

module.exports = router;
