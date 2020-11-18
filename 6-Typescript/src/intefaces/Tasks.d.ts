export type GUID = string;

export interface NewTask {
    text: string;
    isDone: boolean;
}

export interface Task extends NewTask {
    id: GUID;
}

export type TasksById = {[id: string]: Task};