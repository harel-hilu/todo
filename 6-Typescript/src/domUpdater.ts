import { TasksHashMap } from "./intefaces/Tasks";
import { MainView } from "./view/MainView";

let previousTasks = "";

export const renderTasksIfTasksChanged = (tasks: TasksHashMap, mainView: MainView): void => {
    const stringifiedTasks = JSON.stringify(tasks);

    if (previousTasks !== stringifiedTasks) {
        previousTasks = stringifiedTasks;
        mainView.render(Object.values(tasks));
        mainView.insertTaskView.clearInputAndFocus();
    }
}