import { Task, TasksHashMap } from "./intefaces/Tasks";
import { MainView } from "./view/MainView";

let previousTasks = "";

export const renderTasksIfTasksChanged = 
    (tasks: TasksHashMap, mainView: MainView): void => {
    const stringifiedTasks = JSON.stringify(tasks);
    
    if (previousTasks !== stringifiedTasks) {
        const tasksArray: Task[] = Object.values(tasks);
        for (const iterator of Object.values(mainView)) {
            !iterator.render || iterator.render.call(iterator, tasksArray);
        }
        
        previousTasks = stringifiedTasks;
        mainView.insertTaskView.clearInputAndFocus();
    }
}