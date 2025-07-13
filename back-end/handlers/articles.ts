import { NextFunction, Request, Response } from "express";
import Article from "../models/Article";
import createHttpError from "http-errors";
import {
    SaveArticleDTO,
    ToggleActionArticleDTO,
} from "../DTOs/articlesRouteDTO";
import User from "../models/User";
import {
    ArticleDocument,
    UserArticle,
    UserDocument,
    UserPassportDocument,
} from "../types/types";

export async function saveArticle(
    req: Request<{}, {}, SaveArticleDTO>,
    res: Response,
    next: NextFunction
) {
    const { title, description, mainPicture, content } = req.body;

    const user = req.user as UserPassportDocument;

    if (!user) {
        return next(createHttpError(400, "Invalid credentials"));
    }

    console.log("IN ARTICLE ROUTE", title, description, mainPicture, content);
    if (!title || !description || !content || !user.id) {
        return next(createHttpError(400, "All required data must be provided"));
    }

    const articleDoc = await Article.create({
        title,
        description,
        mainPicture,
        content,
        author: user.id,
        repostsCount: 0,
        likesCount: 0,
    });
    const article = await articleDoc.save();

    console.log(article);
    console.log("All done!");
    res.status(200).json({
        message: "Article saved successfully",
    });
    return;
}

export async function getUserArticles(req: Request, res: Response) {
    const user = req.user as UserPassportDocument;
    const articles = await Article.find({ author: user.id }).sort({
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
    res: Response,
    next: NextFunction
) {
    const { articleId } = req.body;

    const user = req.user as UserPassportDocument;

    const article: UserArticle | null = await Article.findById(articleId);

    if (!article) {
        return next(createHttpError(404, "No article found with this ID"));
    }

    if (article.author != user.id) {
        return next(createHttpError(403, "No rights to delete this article"));
    }

    await Article.deleteOne(article);
    console.log("deleted");
    res.status(200).json({
        message: "Article deleted successfully",
    });
    return;
}

export async function getUserFullArticle(
    req: Request<{}, {}, { articleId: string }>,
    res: Response,
    next: NextFunction
) {
    const articleId = req.query.articleId;
    const article: ArticleDocument | null = await Article.findById(articleId);
    if (!article) {
        return next(createHttpError(404, "No article found"));
    }

    console.log("Article found");

    const articleAuthor = await User.findById(article.author);
    if (!articleAuthor) {
        console.log("no user found for article");
        return next(createHttpError(404, "No author found with this ID"));
    }

    res.status(200).json({
        article: {
            id: article.id,
            title: article.title,
            mainPic: article.mainPicture,
            description: article.description,
            content: article.content,
            author: articleAuthor.nickname,
            repostsCount: article.repostsCount,
        },
        message: "Article found successfully",
    });
}

export type ArticleAction = "reposts" | "likes";

export async function toggleActionArticle(
    req: Request<{}, {}, ToggleActionArticleDTO>,
    res: Response,
    next: NextFunction
) {
    const { articleId } = req.body;

    const { id: userId } = req.user as UserPassportDocument;

    const actionType: ArticleAction = req.url.includes("repost")
        ? "reposts"
        : "likes";

    let article = await Article.findById(articleId);
    if (!article) {
        return next(createHttpError(404, "No article found with this ID"));
    }

    let user: UserDocument | null = await User.findById(userId);
    if (!user) {
        return next(createHttpError(404, "No user found with this ID"));
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
        return next(createHttpError(404, "No user found with this ID"));
    }

    const articleAuthor = await User.findById(article.author);

    const returnObj = {
        type,
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
        articles,
    });
}

export async function getUserFavourites(req: Request, res: Response) {
    const { id: userId } = req.user as UserPassportDocument;

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
