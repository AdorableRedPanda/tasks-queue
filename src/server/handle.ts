import type { Context } from 'hono';

import { executeTasks } from '@/executeTasks';
import { buildId, wait } from '@/helpers';
import { EntryTask } from '@/tasks';

export const handle = async (c: Context) => {
	await wait(100);

	const requestId = buildId();

	const entry = new EntryTask(
		{ input: 'hello world', maxAttempts: 4 },
		requestId,
	);

	await executeTasks([entry]);

	return c.json({ status: 'ok' });
};
