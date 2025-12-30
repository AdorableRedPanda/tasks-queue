import type { TaskResult } from '@/types';

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

		await wait(100 * current);

		const nextTask =
			current < max
				? new IterationTask({ current: current + 1, max }, this)
				: new MessageTask(
						{ payload: `Max iterations count exceeded (${max})` },
						this,
					);

		return {
			data: [nextTask],
			type: 'push',
		};
	}
}
