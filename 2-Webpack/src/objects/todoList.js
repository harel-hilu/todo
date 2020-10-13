import {Task} from "./task.js";
import {saveTaskToStorage, getTasksFromStorage, removeTaskFromStorage} from "./../saver/taskToLocalStorage.js";

export class todoList {
    constructor () {
        this.tasks = new Map();
        getTasksFromStorage().forEach(task => this.tasks.set(task.id, task));
    }

    removeTask(taskId) {
        removeTaskFromStorage(taskId);
        this.tasks.delete(taskId);
    }

    addTask(taskId, taskText, isTaskComplete) {
        let newTask = new Task(taskId, taskText, isTaskComplete);
        saveTaskToStorage(newTask);
        this.tasks.set(newTask.id, newTask);

        return newTask;
    };
}