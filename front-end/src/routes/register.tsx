import { createFileRoute } from '@tanstack/react-router'
import Register from "../components/Register/Register";
import { beforeLoadPage } from '../utils/utils';

export const Route = createFileRoute('/register')({
    beforeLoad: () => beforeLoadPage(true),
    component: Register,
});
