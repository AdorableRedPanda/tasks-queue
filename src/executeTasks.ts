import type { Action, MessageData, TaskItem } from '@/types';

import { createQueue, validateTimeout } from '@/helpers';

export const executeTasks = async (
	tasks: TaskItem[],
	log: Action<TaskItem>,
	onMessage: Action<MessageData>,
) => {
	const queue = createQueue(tasks);
	const start = new Date();

	for await (const task of queue) {
		validateTimeout(start);
		log(task);

		const next = await task.execute();

		if (next.type === 'push') {
			queue.push(...next.data);
		}

		if (next.type === 'message') {
			onMessage(next.data);
		}
	}
};
