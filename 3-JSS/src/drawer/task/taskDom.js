import { classes } from "./taskDomStyle.js";

const tasksAreaDomId = "tasksList";

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

export const createTaskLabel = (taskText) => {
    const label = document.createElement("label");
    label.setAttribute("contenteditable", "true");
    label.append(document.createTextNode(taskText));
    label.setAttribute("class", classes.label);

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