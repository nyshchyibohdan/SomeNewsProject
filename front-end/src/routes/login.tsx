import { createFileRoute } from '@tanstack/react-router'
import Login from '../components/Login/Login'
import z from 'zod';
import { beforeLoadPage } from '../utils/utils';

export const Route = createFileRoute('/login')({
  beforeLoad: () => beforeLoadPage(true),
  component: Login,
  validateSearch: z.object({
    registered: z.string().optional(),
  }),
})
