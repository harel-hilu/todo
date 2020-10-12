import {saveTaskToStorage, getTasksFromStorage, removeTaskFromStorage} from './saver/taskToLocalStorage.js'
import {Task} from './objects/task.js';
import {createTaskDiv, createCheckbox, createEditButton, createDeleteButton, createLabel} from './drawer/taskToDOM.js'
import {getTaskToAddInputElem, getTaskToAddInputText, isEmptyTaskToAddInput, focusTaskToAddInput, clearTaskToAddInput} from "./DOMHelper/taskToAddInput.js";

window.addEventListener("load", () => {
    
    getTasksFromStorage().forEach(task => addTask(task));
    
    document.getElementById("addTaskButton").addEventListener("click", addTaskHandler);
    getTaskToAddInputElem().addEventListener("keydown", (e) => { 
        if (e.code === "Enter"){
            addTaskHandler();
        }
    })

    focusTaskToAddInput();
});

let addTaskHandler = () => {
    if (!isEmptyTaskToAddInput()){
        let taskToAdd = new Task(undefined, getTaskToAddInputText(), false);
        addTask(taskToAdd);
        saveTaskToStorage(taskToAdd);
        clearTaskToAddInput();
    }    
    
    focusTaskToAddInput();    
};

let addTask = (taskToAdd) => {
    const taskElement = createTaskDiv(taskToAdd.id);

    const isCompleteCheckbox = createCheckbox(taskToAdd.isComplete);
    isCompleteCheckbox.addEventListener("click", (e) => taskCompletedClicked(e, taskToAdd));

    const taskLabel = createLabel(taskToAdd.text);
    taskLabel.addEventListener("focusout", (e) => labelFocusOut(e, taskToAdd));

    const taskEditButton = createEditButton(taskElement);
    taskEditButton.addEventListener("click", () => editTaskClicked(taskElement));

    const taskDeleteButton = createDeleteButton(taskElement);
    taskDeleteButton.addEventListener("click", () => deleteTaskClicked(taskElement));

    taskElement.append(isCompleteCheckbox);
    taskElement.append(taskLabel);
    taskElement.append(taskEditButton);
    taskElement.append(taskDeleteButton);

    document.getElementById("tasksList").append(taskElement);
};

let taskCompletedClicked = (e, taskToAdd) => saveTaskToStorage(new Task(taskToAdd.id, taskToAdd.text, e.target.checked));

let deleteTaskClicked = (taskElement) => {
    removeTaskFromStorage(taskElement);
    taskElement.parentNode.removeChild(taskElement);
    focusTaskToAddInput();
};

let editTaskClicked = (taskElement) => taskElement.querySelector("label").focus();

let labelFocusOut = (e, taskToAdd) => saveTaskToStorage(new Task(taskToAdd.id, e.target.innerHTML, taskToAdd.isComplete));