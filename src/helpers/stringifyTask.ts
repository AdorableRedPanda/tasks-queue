import type { TaskData } from '@/types';

export const stringifyTask = <TPayload>({
	payload,
	requestId,
	type,
}: TaskData<TPayload>) =>
	`[${type}] requestId: ${requestId}, payload: ${JSON.stringify(payload)}`;
