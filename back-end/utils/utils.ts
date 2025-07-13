import { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import Article from "../models/Article";

export function isHttpError(
    err: unknown
): err is { statusCode: number; message: string } {
    return err instanceof HttpError;
}

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let statusCode = 500;
    let message = "An unknown error occured";
    if (isHttpError(error)) {
        statusCode = error.statusCode;
        message = error.message;
    }
    res.status(statusCode).send({ message });
}

export async function deleteUserArticles(userId: string) {
    try {
        const userArticles = await Article.find({ author: userId });
        if (userArticles.length === 0) {
            console.log("No articles is there");
            return true;
        }
        const deletedArticles = await Article.deleteMany({ author: userId });
        if (deletedArticles.deletedCount === 0) {
            console.log("No articles deleted here");
            return false;
        }
        console.log("Deleted articles:", deletedArticles.deletedCount);
    } catch (error) {
        console.error("Error deleting articles:", error);
        return false;
    }
    return true;
}

export async function checkAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) {
        return next(createHttpError(401, "You need to authorize first"));
    }
    return next();
}
