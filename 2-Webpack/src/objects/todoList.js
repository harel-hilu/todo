import {Task} from "./task.js";
import {saveTaskToStorage, getTasksFromStorage, removeTaskFromStorage} from "./../saver/taskToLocalStorage.js";

export class TodoList {
    constructor () {
        this.tasks = {};
        getTasksFromStorage().forEach(task => this.tasks[task.id] = task);
    }

    removeTask(taskId) {
        removeTaskFromStorage(taskId);
        delete this.tasks[taskId];
    }

    addTask(taskId, taskText, isTaskComplete) {
        let newTask = new Task(taskId, taskText, isTaskComplete);
        saveTaskToStorage(newTask);
        this.tasks[newTask.id] = newTask;

        return newTask;
    };

    countTasks() {
        return Object.keys(this.tasks).length;
    }

    countDoneTasks() {
        return Object.values(this.tasks).filter(task => task.isComplete).length;;
    }
}