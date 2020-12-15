import { Task, NewTask } from "../../../../common/Tasks";

interface updateTaskDeleteTask {
    updateTask: (task: Task) => Task;
    deleteTask: (task: Task) => void;
}

export interface AddNewTaskProps {
    addTask: (task: NewTask) => Task;
}

export type EmptyState = AddNewTaskProps;


export interface TaskLineProps extends updateTaskDeleteTask {
    task: Task;
}

export interface TasksListProps extends updateTaskDeleteTask {
    tasks: Task[];
}

export interface TitleProps {
    doneTasks: number;
    totalTasks: number;
}