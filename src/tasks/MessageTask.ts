import type { MessageData, TaskResult } from '@/types';

import { AbstractTask } from './AbstractTask';

export class MessageTask extends AbstractTask<MessageData> {
	constructor(payload: MessageData, parent: AbstractTask) {
		super(payload, 'message', parent);
	}

	execute(): Promise<TaskResult> {
		return Promise.resolve({
			data: this.payload,
			type: 'message',
		});
	}
}
