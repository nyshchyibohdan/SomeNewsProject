import { Document } from "mongoose";

export interface User {
    nickname: string;
    email: string;
    bio: string;
    profilePic: string;
    reposts: string[];
    likes: string[];
}

export interface UserDocument extends User, Document {}

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
