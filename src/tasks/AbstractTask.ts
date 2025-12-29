import type { Executable, TaskResult, TaskType } from '@/types';

import { RootTask } from './RootTask';

export abstract class AbstractTask<TPayload extends {}>
	extends RootTask<TPayload>
	implements Executable
{
	constructor(payload: TPayload, type: TaskType, parent: RootTask) {
		super(type, payload, parent.requestId);
	}

	abstract execute(): Promise<TaskResult>;
}
