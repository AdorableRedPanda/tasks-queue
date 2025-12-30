import { useInput } from 'ink';
import process from 'node:process';
import { useState } from 'react';

import type { Action, MessageData, TaskItem } from '@/types';

import { executeTasks } from '@/executeTasks';
import { buildId, stringifyTask } from '@/helpers';
import { EntryTask } from '@/tasks';

export const useProcessStop = () => {
	useInput((input, key) => {
		if (key.ctrl && input === 'c') {
			process.exit(0);
		}
	});
};

type ArrayHook<TItem> = [TItem[], (item: TItem) => void, () => void];

export const useArray = <TItem>(): ArrayHook<TItem> => {
	const [array, setArr] = useState<TItem[]>([]);

	const clear = () => setArr([]);
	const push = (item: TItem) => setArr((prev) => [...prev, item]);

	return [array, push, clear];
};

export const useExecute = () => {
	const [loading, setLoading] = useState(false);
	const [logs, addLog, clearLogs] = useArray<string>();
	const [messages, addMsg, clearMessages] = useArray<string>();

	const startExecution = (input: string) => {
		clearLogs();
		clearMessages();

		const entry = new EntryTask({ input, iterations: 4 }, buildId());

		const log: Action<TaskItem> = (task) => addLog(stringifyTask(task));

		const onMessage: Action<MessageData> = (message) => {
			addMsg(message.payload);

			if (message.type === 'start') {
				setLoading(true);
			}

			if (message.type === 'complete') {
				setLoading(false);
			}
		};

		executeTasks([entry], log, onMessage);
	};

	return { loading, logs, messages, startExecution };
};
