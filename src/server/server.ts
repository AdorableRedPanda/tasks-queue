import { Hono } from 'hono';

import { handle } from './handle';

export const server = new Hono();

server.get('/', handle);
