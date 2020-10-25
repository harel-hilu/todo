import jss from "jss";
import { shared } from "../appStyle.js";

const tasksAreaDomId = "tasksList";
const classes = getStyles();

export const createTasksArea = () => {
    const tasksArea = document.createElement("div");
    tasksArea.setAttribute("id", tasksAreaDomId);
    document.getElementById("app").append(tasksArea);
}

export const appendTaskToArea = (taskElement) => document.getElementById(tasksAreaDomId).append(taskElement);

export const createTaskElement = (taskId) => {
    const newTaskDiv = document.createElement("div");
    newTaskDiv.setAttribute("id", taskId);
    newTaskDiv.setAttribute("class", classes.task);

    return newTaskDiv;
};

export const createTaskLabel = (taskToAdd) => {
    const label = document.createElement("label");
    label.setAttribute("contenteditable", "true");
    label.append(document.createTextNode(taskToAdd.text));
    label.setAttribute("class", classes.label);
    changeLabelColor(label, taskToAdd.isComplete);

    return label;
}

export const createTaskCheckbox = (isComplete) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", classes.checkbox);

    if(isComplete) {
        checkbox.setAttribute("checked", "checked");
    }

    return checkbox;
}

export const createTaskEditButton = () => {
    const editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("Edit"));
    editButton.setAttribute("class", classes.buttons);

    return editButton;
}

export const createTaskDeleteButton = () => {
    const deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));
    deleteButton.setAttribute("class", classes.buttons);

    return deleteButton;
}

export const changeLabelColor = (labelElement, isComplete) => isComplete ? 
    labelElement.classList.add(classes.checkedLabel) : 
    labelElement.classList.remove(classes.checkedLabel);


function getStyles() {
    const styles = {
        task: {
            'padding-top': '5px',
            'padding-bottom': '5px',
            'display': 'flex',
            'border-bottom-style': 'solid',
            'border-bottom-color': '#3d3d3d',
            'border-bottom-width': '1px',
        },
        label: {
            'color': "white",
            'margin-left': '5px',
            'margin-top': 'auto',
            'margin-bottom': 'auto',
            'vertical-align': 'middle',
            'flex-grow': 1
        },
        checkbox: {
            'width': '20px',
            'height': '20px',
            'cursor': 'pointer',
            'background-color': 'black',
        },
        buttons: {
            'margin-left': '10px',
            'border-color': shared.mainColor,
            'border-radius': '5px',
            'border': 'none',
            'background-color': 'white',
            'color': shared.backgroundColor,
        },
        checkedLabel: {
            'color': '#a0a0a0',
        }
    }

   return jss.createStyleSheet(styles).attach().classes;
}