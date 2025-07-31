import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/technology')({
  component: Technology,
  loader: async () => {
    const state = store.getState();
    const news = state.newsApi.technology;

    if (!news || news.length === 0) {
      await store.dispatch(getNews('technology'));
    }

    return null;
  },
  pendingComponent: Loader
});

import NewsPages from '../components/NewsPages/NewsPages';
import { getNews } from '../state/newsApiSlice';
import { store } from '../store';
import Loader from '../components/Loader/Loader';

function Technology() {
  return (
    <div data-testid="technology-page">
      <NewsPages topic="technology" />
    </div>
  );
}

export default Technology;
