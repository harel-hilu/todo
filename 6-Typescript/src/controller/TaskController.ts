import { Task } from "../model/Task";
import { taskElements } from "../view/TasksView";
import { MainView } from "../view/MainView";

export function assignFunctionalityToTask(elements: taskElements, taskRelated: Task) {
    elements.taskCheckbox.addEventListener("click", 
        () => checkboxClicked(taskRelated));
    elements.taskLabel.addEventListener("focusout", 
        () => labelUpdated(taskRelated, elements.taskLabel.textContent));
    elements.taskEditButton.addEventListener("click", 
        () => elements.taskLabel.focus());
    elements.taskDeleteButton.addEventListener("click", 
        () => deleteButtonClicked(elements.taskArea));
    elements.taskLabel.addEventListener("keydown", keyPressedInLabel);
}

const checkboxClicked = (taskRelated: Task): void => {
    taskRelated.isDone = !taskRelated.isDone;
}

const deleteButtonClicked = (taskArea: HTMLElement): void => {
    taskArea.parentNode.removeChild(taskArea);
}

const labelUpdated = (taskRelated: Task, newText: string): void => {
    taskRelated.text = newText;
}

const keyPressedInLabel = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
        MainView.insertTaskView.focusOnInput();
    }
}