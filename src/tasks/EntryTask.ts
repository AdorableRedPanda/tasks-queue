import type { ID } from '@/types';

import { AbstractTask } from './AbstractTask';
import { RootTask } from './RootTask';

interface EntryPayload {
	input: string;
	maxAttempts: number;
}

export class EntryTask extends AbstractTask<EntryPayload> {
	constructor(payload: EntryPayload, requestId: ID) {
		const root = new RootTask<EntryPayload>('entry', payload, requestId);
		super(payload, 'entry', root);
	}

	async execute() {
		return [];
	}
}
