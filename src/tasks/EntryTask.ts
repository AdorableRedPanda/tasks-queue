import type { ID } from '@/types';

import { AbstractTask } from './AbstractTask';
import { RootTask } from './RootTask';

interface EntryPayload {
	attempts: number;
	input: string;
}

export class EntryTask extends AbstractTask<EntryPayload> {
	constructor(payload: EntryPayload, requestId: ID) {
		const root = new RootTask<EntryPayload>('entry', payload, requestId);
		super(payload, 'entry', root);
	}

	async execute() {
		throw new Error('Method not implemented.');
	}
}
