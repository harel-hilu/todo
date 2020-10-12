import {saveTaskToStorage, getTasksFromStorage, removeTaskFromStorage} from './saver/taskToLocalStorage.js'
import {Task} from './objects/task.js';
import {createTaskElement, createTaskCheckbox, createTaskDeleteButton, createTaskEditButton, createTaskLabel} from './drawer/taskToDOM.js'
import {getNewTaskInputElement, getNewTaskInputText, isEmptyNewTaskInput, focusNewTaskInput, clearNewTaskInput} from "./DOMHelper/newTaskInput.js";

window.addEventListener("load", () => {
    getTasksFromStorage().forEach(task => drawTask(task));
    document.getElementById("addTaskButton").addEventListener("click", addTaskHandler);
    getNewTaskInputElement().addEventListener("keydown", (e) => { 
        if (e.code === "Enter"){
            addTaskHandler();
        }
    })

    focusNewTaskInput();
});

let addTaskHandler = () => {
    if (!isEmptyNewTaskInput()){
        let taskToAdd = new Task(undefined, getNewTaskInputText(), false);
        drawTask(taskToAdd);
        saveTaskToStorage(taskToAdd);
        clearNewTaskInput();
    }    
    
    focusNewTaskInput();    
};

let drawTask = (taskToAdd) => {
    const taskElement = createTaskElement(taskToAdd.id);

    const isDoneTaskCheckbox = createTaskCheckbox(taskToAdd.isComplete);
    isDoneTaskCheckbox.addEventListener("click", (e) => taskToAdd = taskCheckboxClicked(e, taskToAdd));

    const taskLabel = createTaskLabel(taskToAdd.text);
    taskLabel.addEventListener("focusout", (e) => taskToAdd = taskLabelFocusOut(e, taskToAdd));
    taskLabel.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            focusNewTaskInput();
        }
    });

    const taskEditButton = createTaskEditButton(taskElement);
    taskEditButton.addEventListener("click", () => editTaskClicked(taskElement));

    const taskDeleteButton = createTaskDeleteButton(taskElement);
    taskDeleteButton.addEventListener("click", () => deleteTaskClicked(taskElement));

    taskElement.append(isDoneTaskCheckbox);
    taskElement.append(taskLabel);
    taskElement.append(taskEditButton);
    taskElement.append(taskDeleteButton);

    document.getElementById("tasksList").append(taskElement);
};

let taskCheckboxClicked = (e, taskToAdd) => {
    let taskAfterClick = new Task(taskToAdd.id, taskToAdd.text, e.target.checked);
    saveTaskToStorage(taskAfterClick);

    return taskAfterClick;
};

let deleteTaskClicked = (taskElement) => {
    removeTaskFromStorage(taskElement);
    taskElement.parentNode.removeChild(taskElement);
    focusNewTaskInput();
};

let editTaskClicked = (taskElement) => taskElement.querySelector("label").focus();

let taskLabelFocusOut = (e, taskToAdd) => {
    let taskAfterChange = new Task(taskToAdd.id, e.target.innerHTML, taskToAdd.isComplete);
    saveTaskToStorage(taskAfterChange);

    return taskAfterChange;
};