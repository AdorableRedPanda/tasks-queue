import type { TaskData } from '@/types';

export const stringifyTask = <TPayload>({
	id,
	payload,
	type,
}: TaskData<TPayload>) =>
	`[${type}, ${id}] payload: ${JSON.stringify(payload)}`;
