import { Document } from "mongoose";

export interface User {
    nickname: string;
    email: string;
    bio: string | null | undefined;
    profilePic: string;
    reposts: string[];
    likes: string[];
    password: string;
}

export interface UserDocument extends Omit<User, "password">, Document {}

export interface UserPassportDocument
    extends Pick<
            UserDocument,
            | "id"
            | "nickname"
            | "email"
            | "bio"
            | "profilePic"
            | "reposts"
            | "likes"
        >,
        Pick<User, "password"> {}

export interface Article {
    title: string;
    description: string;
    content: string;
    publishedAt: string;
    source: string;
    url: string;
    author: string;
    urlToImage: string;
}

export interface UserArticle {
    title: string;
    description: string;
    content: string;
    author: string;
    mainPicture: string;
    repostsCount: number;
    likesCount?: number;
}

export interface ArticleDocument extends UserArticle, Document {}
