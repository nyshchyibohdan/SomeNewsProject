const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('./User');

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: false,
        },
        description: {
            type: String,
            required: true,
            unique: false,
        },
        mainPicture: {
            type: String,
            required: false,
            unique: false,
        },
        content: {
            type: String,
            required: true,
            unique: false,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

module.exports = Article;
