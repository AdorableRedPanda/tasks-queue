export type Action<TArg> = (arg: TArg) => void;

export interface Executable {
	execute(): Promise<TaskResult>;
}

export type ID = string & { readonly brand: ID };

export interface MessageData {
	payload: string;
	type: MessageType;
}

export interface TaskData<TPayload> {
	id: ID;
	payload: TPayload;
	requestId: ID;
	type: TaskType;
}

export type TaskItem = Executable & TaskData<unknown>;

export type TaskResult =
	| { data: MessageData; type: 'message' }
	| { data: TaskItem[]; type: 'push' };

export type TaskType = 'entry' | 'iteration' | 'message';

type MessageType = 'complete' | 'progress' | 'start';
