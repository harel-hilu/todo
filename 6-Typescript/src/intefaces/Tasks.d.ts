export type GUID = string;

export interface TaskNoId {
    text: string;
    isDone: boolean;
}

export interface Task extends TaskNoId {
    id: GUID;
}

export type TasksHashMap = {[id: string]: Task};