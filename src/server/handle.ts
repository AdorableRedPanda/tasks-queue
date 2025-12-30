import type { Context } from 'hono';

import type { Action, MessageData, TaskItem } from '@/types';

import { executeTasks } from '@/executeTasks';
import { buildId, stringifyTask, wait } from '@/helpers';
import { EntryTask } from '@/tasks';

export const handle = async (c: Context) => {
	await wait(100);

	const requestId = buildId();

	const entry = new EntryTask({ maxIterations: 4 }, requestId);

	const log: Action<TaskItem> = (task) => {
		console.info(stringifyTask(task));
	};

	const onMessage: Action<MessageData> = (message) => {
		console.info('Message:', message.payload);
	};

	try {
		await executeTasks([entry], log, onMessage);
		return c.json({ status: 'ok' });
	} catch (error) {
		const message = (error as Error).message;
		return c.json({ message }, 500);
	}
};
