export interface SaveArticleDTO {
    title: string;
    description: string;
    mainPicture?: string;
    content: string;
    author: string;
}

export interface ToggleRepostArticleDTO {
    articleId: string;
    userId: string;
}
export interface ToggleLikeArticleDTO {
    articleId: string;
    userId: string;
}
