import type { TaskData } from '@/types';

export const stringifyTask = <TPayload>({
	payload,
	type,
}: TaskData<TPayload>) => `${type}, payload: ${JSON.stringify(payload)}`;
