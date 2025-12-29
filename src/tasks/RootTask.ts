import type { ID, TaskData, TaskType } from '@/types';

import { buildId } from '@/helpers';

export class RootTask<TPayload extends object = object>
	implements TaskData<TPayload>
{
	constructor(
		public type: TaskType,
		public payload: TPayload,
		public requestId: ID,
		public id = buildId(),
	) {}
}
