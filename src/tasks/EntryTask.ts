import type { ID, TaskResult } from '@/types';

import { AbstractTask } from './AbstractTask';
import { IterationTask } from './IterationTask';
import { MessageTask } from './MessageTask';
import { RootTask } from './RootTask';

interface EntryPayload {
	maxIterations: number;
}

export class EntryTask extends AbstractTask<EntryPayload> {
	constructor(payload: EntryPayload, requestId: ID) {
		const root = new RootTask<EntryPayload>('entry', payload, requestId);
		super(payload, 'entry', root);
	}

	async execute(): Promise<TaskResult> {
		return Promise.resolve({
			data: [
				new MessageTask({ payload: `Start iterations` }, this),
				new IterationTask(
					{ current: 0, max: this.payload.maxIterations },
					this,
				),
			],
			type: 'push',
		});
	}
}
