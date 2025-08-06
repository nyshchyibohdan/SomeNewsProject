import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/science')({
  beforeLoad: () => beforeLoadPage(),
  component: Science,
  loader: async () => {
    const state = store.getState();
    const news = state.newsApi.science;

    if (!news || news.length === 0) {
      await store.dispatch(getNews('science'));
    }

    return null;
  },
  pendingComponent: Loader
});

import NewsPages from '../components/NewsPages/NewsPages';
import { getNews } from '../state/newsApiSlice';
import { store } from '../store';
import Loader from '../components/Loader/Loader';
import { beforeLoadPage } from '../utils/utils';

function Science() {
  return (
    <div data-testid="science-page">
      <NewsPages topic="science" />
    </div>
  );
}

export default Science;
