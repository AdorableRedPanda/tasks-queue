export type ID = string & { readonly brand: ID };

export interface TaskData<TPayload> {
	id: ID;
	payload: TPayload;
	requestId: ID;
	type: TaskType;
}

export type TaskType = 'attempt' | 'entry' | 'terminal';

export interface Executable {
    execute(): Promise<TaskResult>;
}

export type TaskItem = TaskData<unknown> & Executable;

export type TaskResult = TaskItem[]