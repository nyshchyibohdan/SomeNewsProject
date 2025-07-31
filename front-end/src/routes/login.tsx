import { createFileRoute } from '@tanstack/react-router'
import Login from '../components/Login/Login'
import z from 'zod';

export const Route = createFileRoute('/login')({
  component: Login,
  validateSearch: z.object({
    registered: z.string().optional(),
  }),
})
