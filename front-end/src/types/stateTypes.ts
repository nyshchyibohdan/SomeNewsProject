// News API slice types and interfaces

export interface NewsApiArticle {
    title: string;
    description: string;
    content: string;
    publishedAt: string;
    source: string;
    url: string;
    author: string;
    img: string;
}

export class NewsApiArticleClass implements NewsApiArticle {
    title: string;
    description: string;
    content: string;
    publishedAt: string;
    source: string;
    url: string;
    author: string;
    img: string;

    constructor(
        title: string,
        description: string,
        content: string,
        publishedAt: string,
        source: string,
        url: string,
        author: string,
        img: string
    ) {
        this.title = title;
        this.description = description;
        this.content = content;
        this.publishedAt = publishedAt;
        this.source = source;
        this.url = url;
        this.author = author;
        this.img = img;
    }
}

export interface NewsApiInitialState {
    general: NewsApiArticle[];
    sport: NewsApiArticle[];
    science: NewsApiArticle[];
    technology: NewsApiArticle[];
}

export type Category = "general" | "sport" | "science" | "technology";

// User slice types

export interface User {
    id: string;
    nickname: string;
    email: string;
    bio: string | null | undefined;
    profilePic: string;
    reposts: string[];
    likes: string[];
}
