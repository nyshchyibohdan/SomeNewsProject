import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sport')({
    beforeLoad: () => beforeLoadPage(),
    component: Sport,
    loader: async () => {
        const state = store.getState();
        const news = state.newsApi.sport;

        if (!news || news.length === 0) {
            await store.dispatch(getNews('sport'));
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

function Sport() {
    return (
        <div data-testid="sport-page">
            <NewsPages topic="sport" />
        </div>
    );
}

export default Sport;
