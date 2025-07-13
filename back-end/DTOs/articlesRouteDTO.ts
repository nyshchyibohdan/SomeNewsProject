export interface SaveArticleDTO {
    title: string;
    description: string;
    mainPicture?: string;
    content: string;
}

export interface ToggleActionArticleDTO {
    articleId: string;
}
