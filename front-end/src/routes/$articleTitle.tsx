import { createFileRoute } from '@tanstack/react-router'
import Loader from '../components/Loader/Loader'
import Article from '../components/Article/Article'
import type { Category, NewsApiArticle } from '../types/stateTypes'
import { store } from '../store'

export const Route = createFileRoute('/$articleTitle')({
  component: Article,
  loader: async ({ params }) => {
    const newsState = store.getState().newsApi;
    const [topic, title] = params.articleTitle.split('/');

    const category = topic as Category;
    const foundedArticle = newsState[category].find((article: NewsApiArticle) => article.title == title)

    if (foundedArticle) {
      return {
        article: foundedArticle
      }
    }
  },
  pendingComponent: Loader
})