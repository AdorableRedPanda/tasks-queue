import type { TaskItem } from '@/types';

import { createQueue, stringifyTask } from '@/helpers';

export const executeTasks = async (tasks: TaskItem[]) => {
	const queue = createQueue(tasks);

	for await (const task of queue) {
		console.info(stringifyTask(task));

		const next = await task.execute();

		queue.push(...next);
	}
};
