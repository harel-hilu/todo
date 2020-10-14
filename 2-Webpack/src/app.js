import {createTaskElement, createTaskCheckbox, createTaskDeleteButton, createTaskEditButton, createTaskLabel, updateTasksTitle} from './drawer/taskToDOM.js'
import {getNewTaskInputElement, getNewTaskInputText, isEmptyNewTaskInput, focusNewTaskInput, clearNewTaskInput} from "./DOMHelper/newTaskInput.js";
import {todoList} from "./objects/todoList.js";

let todo = new todoList();

window.addEventListener("load", () => {
    for (const task of todo.tasks.values()) {
        drawTask(task);
    }
    
    document.getElementById("addTaskButton").addEventListener("click", addTaskHandler);
    getNewTaskInputElement().addEventListener("keydown", (e) => { 
        if (e.code === "Enter"){
            addTaskHandler();
        }
    })
    
    updateTasksTitle(todo.tasks.size);
    focusNewTaskInput();
});

let addTaskHandler = () => {
    if (!isEmptyNewTaskInput()){
        let taskToAdd = todo.addTask(undefined, getNewTaskInputText(), false);
        drawTask(taskToAdd);
        updateTasksTitle(todo.tasks.size);
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

let taskCheckboxClicked = (e, taskToAdd) => todo.addTask(taskToAdd.id, taskToAdd.text, e.target.checked);

let editTaskClicked = (taskElement) => taskElement.querySelector("label").focus();

let taskLabelFocusOut = (e, taskToAdd) => todo.addTask(taskToAdd.id, e.target.innerHTML, taskToAdd.isComplete);

let deleteTaskClicked = (taskElement) => {
    taskElement.parentNode.removeChild(taskElement);
    todo.removeTask(taskElement.id);
    updateTasksTitle(todo.tasks.size);
    focusNewTaskInput();
};