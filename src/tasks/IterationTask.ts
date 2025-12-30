import type { TaskItem, TaskResult } from '@/types';

import { wait } from '@/helpers';

import { AbstractTask } from './AbstractTask';
import { MessageTask } from './MessageTask';

interface IterationPayload {
	current: number;
	max: number;
}

export class IterationTask extends AbstractTask<IterationPayload> {
	constructor(payload: IterationPayload, parent: AbstractTask) {
		super(payload, 'iteration', parent);
	}

	async execute(): Promise<TaskResult> {
		const { current, max } = this.payload;

		await wait(500 * current);

		const tasks: TaskItem[] = [];

		if (current === Math.round(max / 2)) {
			tasks.push(
				new MessageTask(
					{ payload: 'Half iterations exceeded', type: 'progress' },
					this,
				),
			);
		}

		if (current < max) {
			tasks.push(new IterationTask({ current: current + 1, max }, this));
		}

		if (current >= max) {
			tasks.push(
				new MessageTask(
					{
						payload: `Max iterations count exceeded (${max})`,
						type: 'complete',
					},
					this,
				),
			);
		}

		return {
			data: tasks,
			type: 'push',
		};
	}
}
