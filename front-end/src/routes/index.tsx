import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Home,
    loader: async () => {
        const state = store.getState();
        const news = state.newsApi.general;

        if (!news || news.length === 0) {
            await store.dispatch(getNews('general'));
        }

        return null;
    },
    pendingComponent: Loader
});

import NewsPages from '../components/NewsPages/NewsPages';
import { getNews } from '../state/newsApiSlice';
import { store } from '../store';
import Loader from '../components/Loader/Loader';

function Home() {
    return (
        <div data-testid="home-page">
            <NewsPages topic="general" />
        </div>
    );
}

export default Home;
