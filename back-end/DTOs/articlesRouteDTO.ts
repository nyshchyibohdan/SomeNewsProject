export interface SaveArticleDTO {
    title: string;
    description: string;
    mainPicture?: string;
    content: string;
    author: string;
}

export interface ToggleActionArticleDTO {
    articleId: string;
    userId: string;
}
