import jss from "jss";
import { shared } from "../appStyle.js";

const inputDomId = "taskToAddInput";
const buttonDomId = "addTaskButton";
const classes = getStyles();

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

function getStyles() {
    const styles = {
        insertTask: {
            display: 'flex',
            'margin-bottom': '10px'
        },
        input: {
            'flex-grow': 1,
            'max-width': '500px',
            'margin-right': '20px',
            'border': 'none',
            'padding': '10px',
        },
        addButton: {
            padding: '10px',
            'text-transform': 'uppercase',
            'border-radius': '10px',
            border: 'none',
            color: "white",
            'background-color': shared.mainColor
        }
    }

    return jss.createStyleSheet(styles).attach().classes;
}