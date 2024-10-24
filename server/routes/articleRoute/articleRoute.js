const express = require('express');
const Article = require('../../../src/models/Article');
const User = require('../../../src/models/User');

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
            repostsCount: 0,
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

router.get('/user-full-article', async (req, res) => {
    const articleId = req.query.articleId;

    try {
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(400).json({
                success: false,
                message: 'Article not found',
            });
        }

        console.log('Article found');

        const articleAuthor = await User.findById(article.author);
        if (!articleAuthor) {
            console.log('no user found for article');
            return res.status(404).json({
                success: false,
                message: 'No author found with this ID',
            });
        }

        return res.status(200).json({
            article: {
                id: article._id,
                title: article.title,
                mainPic: article.mainPicture,
                description: article.description,
                content: article.content,
                author: articleAuthor.nickname,
                repostsCount: article.repostsCount,
            },
            success: true,
            message: 'Article found successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error getting user article',
        });
    }
});

router.put('/toggle-repost-article', async (req, res) => {
    const { articleId, userId } = req.body;

    try {
        let article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'No article found with this ID',
            });
        }

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No user found with this ID',
            });
        }

        if (user.reposts.includes(articleId)) {
            user.reposts = user.reposts.filter((articleIndex) => articleIndex.toString() !== articleId.toString());
            await user.save();
            article.repostsCount = article.repostsCount || 0;
            article.repostsCount -= 1;
            await article.save();

            console.log('undo repost');
        } else {
            user.reposts.push(articleId);
            await user.save();
            article.repostsCount = article.repostsCount || 0;
            article.repostsCount += 1;
            await article.save();

            console.log('reposted');
        }

        article = await Article.findById(articleId);
        user = await User.findById(userId);

        const articleAuthor = await User.findById(article.author);

        return res.status(200).json({
            user: {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                bio: user.bio,
                profilePic: user.profilePic,
                reposts: user.reposts,
            },
            article: {
                id: article._id,
                title: article.title,
                mainPic: article.mainPicture,
                description: article.description,
                content: article.content,
                author: articleAuthor.nickname,
                repostsCount: article.repostsCount,
            },
            success: true,
            message: 'Toggle repost done successfully',
        });
    } catch (error) {
        console.error('Error toggle repost article:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

router.get('/community-articles', async (req, res) => {
    try {
        const articlesArray = await Article.find().sort({ repostsCount: -1 });

        const articles = await Promise.all(
            articlesArray.map(async (article) => {
                const user = await User.findById(article.author);
                return {
                    id: article._id,
                    title: article.title,
                    description: article.description,
                    mainPic: article.mainPicture,
                    content: article.content,
                    repostsCount: article.repostsCount,
                    author: user ? user.nickname : 'Unknown',
                };
            }),
        );

        return res.status(200).json({
            success: true,
            articles: articles,
        });
    } catch (error) {
        console.error('Error getting articles:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

module.exports = router;
