import { classes } from "./insertTaskStyle.js";

const inputDomId = "taskToAddInput";
const buttonDomId = "addTaskButton";

export const createAddTaskArea = () => {
    const insertTaskElement = document.createElement("div");
    insertTaskElement.classList.add(classes.insertTask);
    insertTaskElement.innerHTML = `
        <input id=${inputDomId} class=${classes.input} type="text" placeholder="Insert your task here">
        <button id=${buttonDomId} class=${classes.addButton}>Add Task</button>`;
    document.getElementById("app").append(insertTaskElement);

    focusNewTaskInput();
}

export const getNewTaskInputElement = () => document.getElementById(inputDomId);
export const getNewTaskInputText = () => document.getElementById(inputDomId).value;
export const isEmptyNewTaskInput = () => (getNewTaskInputElement().value === "");
export const focusNewTaskInput = () => getNewTaskInputElement().focus();
export const clearNewTaskInput = () => getNewTaskInputElement().value = "";
export const getAddTaskButton = () => document.getElementById(buttonDomId);