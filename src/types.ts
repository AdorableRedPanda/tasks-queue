export interface Executable {
	execute(): Promise<TaskResult>;
}

export type ID = string & { readonly brand: ID };

export interface TaskData<TPayload> {
	id: ID;
	payload: TPayload;
	requestId: ID;
	type: TaskType;
}

export type TaskItem = Executable & TaskData<unknown>;

export type TaskResult = TaskItem[];

export type TaskType = 'attempt' | 'entry' | 'terminal';
