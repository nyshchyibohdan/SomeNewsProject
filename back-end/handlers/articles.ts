import { NextFunction, Request, Response } from "express";
import Article from "../models/Article";
import createHttpError from "http-errors";
import {
    SaveArticleDTO,
    ToggleActionArticleDTO,
} from "../DTOs/articlesRouteDTO";
import User from "../models/User";
import { ArticleDocument, UserDocument } from "../types/types";

export async function saveArticle(
    req: Request<{}, {}, SaveArticleDTO>,
    res: Response,
    next: NextFunction
) {
    const { title, description, mainPicture, content, author } = req.body;

    console.log(
        "IN ARTICLE ROUTE",
        title,
        description,
        mainPicture,
        content,
        author
    );
    if (!title || !description || !content || !author) {
        return next(createHttpError(400, "All required data must be provided"));
    }

    const articleDoc = await Article.create({
        title,
        description,
        mainPicture,
        content,
        author,
        repostsCount: 0,
        likesCount: 0,
    });
    const article = await articleDoc.save();

    console.log(article);
    console.log("All done!");
    res.status(200).json({
        success: true,
        message: "Article saved successfully",
    });
    return;
}

export async function getUserArticles(
    req: Request<{}, {}, {}, { userId: string }>,
    res: Response
) {
    const userId = req.query.userId;

    const articles = await Article.find({ author: userId }).sort({
        createdAt: -1,
    });

    if (articles.length === 0) {
        res.status(204).json({});
        return;
    }
    res.status(200).json(articles);
}

export async function deleteArticle(
    req: Request<{}, {}, { articleId: string }>,
    res: Response
) {
    const { articleId } = req.body;

    const article = await Article.findByIdAndDelete(articleId);
    if (!article) {
        res.status(404).json({
            success: false,
            message: "No article found with this ID",
        });
        return;
    }
    console.log("deleted");
    res.status(200).json({
        success: true,
        message: "Article deleted successfully",
    });
}

export async function getUserFullArticle(
    req: Request<{}, {}, { articleId: string }>,
    res: Response
) {
    const articleId = req.query.articleId;
    const article: ArticleDocument | null = await Article.findById(articleId);
    if (!article) {
        res.status(404).json({
            success: false,
            message: "Article not found",
        });
        return;
    }

    console.log("Article found");

    const articleAuthor = await User.findById(article.author);
    if (!articleAuthor) {
        console.log("no user found for article");
        res.status(404).json({
            success: false,
            message: "No author found with this ID",
        });
        return;
    }

    res.status(200).json({
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
        message: "Article found successfully",
    });
}

export type ArticleAction = "reposts" | "likes";

export async function toggleActionArticle(
    req: Request<{}, {}, ToggleActionArticleDTO>,
    res: Response
) {
    const { articleId, userId } = req.body;

    const actionType: ArticleAction = req.url.includes("repost")
        ? "reposts"
        : "likes";

    let article = await Article.findById(articleId);
    if (!article) {
        res.status(404).json({
            success: false,
            message: "No article found with this ID",
        });
        return;
    }

    let user: UserDocument | null = await User.findById(userId);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "No user found with this ID",
        });
        return;
    }

    let type;
    if (user[actionType].includes(articleId)) {
        user[actionType] = user[actionType].filter(
            (articleIndex) => articleIndex.toString() !== articleId.toString()
        );
        await user.save();
        article[`${actionType}Count`] = article[`${actionType}Count`] || 0;
        article[`${actionType}Count`] -= 1;
        await article.save();

        type = "undo";

        console.log(`undo ${actionType}`);
    } else {
        user[actionType].push(articleId);
        await user.save();
        article[`${actionType}Count`] = article[`${actionType}Count`] || 0;
        article[`${actionType}Count`] += 1;
        await article.save();

        type = `${actionType}`;

        console.log(type);
    }

    article = await Article.findById(articleId);
    user = await User.findById(userId);

    if (!user) {
        res.status(404).json({
            success: false,
            message: "No user found with this ID",
        });
        return;
    }

    const articleAuthor = await User.findById(article.author);

    const returnObj = {
        type,
        user: {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic,
            reposts: user.reposts,
            likes: user.likes,
        },
        article: {
            id: article._id,
            title: article.title,
            mainPic: article.mainPicture,
            description: article.description,
            content: article.content,
            author: articleAuthor?.nickname,
            repostsCount: article.repostsCount,
            likesCount: article.likesCount,
        },
        success: true,
        message: `Toggle ${actionType.slice(0, -1)} done successfully`,
    };

    res.status(200).json(returnObj);
}

export async function getCommunityArticles(req: Request, res: Response) {
    const articlesArray: ArticleDocument[] = await Article.find().sort({
        repostsCount: -1,
    });

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
                author: user ? user.nickname : "Unknown",
            };
        })
    );

    if (articles.length === 0) {
        res.status(204).json({});
        return;
    }

    res.status(200).json({
        success: true,
        articles: articles,
    });
}

export async function getUserFavourites(
    req: Request<{}, {}, {}, { userId: string }>,
    res: Response
) {
    const userId = req.query.userId;

    const user = await User.findById(userId);

    const actionType: ArticleAction = req.url.includes("reposts")
        ? "reposts"
        : "likes";

    if (!user || !user[actionType] || user[actionType]?.length === 0) {
        res.status(200).json({
            message: "No articles found",
            articles: [],
        });
        return;
    }

    const userFavourites = await Promise.all(
        user[actionType]!.map((articleId) => Article.findById(articleId))
    );

    const filteredFavourites = userFavourites.filter(
        (article) => article !== null
    );

    const filteredFavouritesIds = filteredFavourites.map(
        (article: ArticleDocument) => article.id.toString()
    );
    const removedFavouritesIds = user[actionType]!.filter(
        (favouriteId) => !filteredFavouritesIds.includes(favouriteId.toString())
    );

    if (removedFavouritesIds.length > 0) {
        user[actionType] = filteredFavouritesIds;
        await user.save();
    }

    if (filteredFavourites.length === 0) {
        res.status(200).json({
            message: "No articles found",
            articles: [],
        });
        return;
    }

    res.status(200).json(filteredFavourites);
}
