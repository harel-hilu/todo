import {saveTaskToStorage, getTasksFromStorage, removeTaskFromStorage} from './localstorage.js'
import {Task} from './task.js';
import {getTaskToAddInputElem, getTaskToAddInputText, isEmptyTaskToAddInput, focusTaskToAddInput, clearTaskToAddInput} from "./taskToAddInput.js";

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
        let taskToAdd = new Task({taskText: getTaskToAddInputText()});
        addTask(taskToAdd);
        saveTaskToStorage(taskToAdd);
        clearTaskToAddInput();
    }    
    
    focusTaskToAddInput();    
};

let addTask = (task) => {
    const newTaskDiv = document.createElement("div");
    newTaskDiv.setAttribute("id", task.id);

    newTaskDiv.append(createCheckbox(task.isComplete));
    newTaskDiv.append(createLabel(task.text));
    newTaskDiv.append(createDeleteButton(newTaskDiv));

    document.getElementById("tasksList").append(newTaskDiv);
};

let createLabel = (taskText) => {
    const label = document.createElement("label");
    label.setAttribute("contenteditable", "true");
    label.append(document.createTextNode(taskText));

    return label;
}

let createCheckbox = (isComplete) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    if(isComplete) {
        checkbox.setAttribute("checked");
    }

    return checkbox;
}

let createEditButton = () => {

}

let createDeleteButton = (newTaskDiv) => {
    
    const deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));
    deleteButton.setAttribute("name", newTaskDiv.id);
    deleteButton.addEventListener("click", () => {
        removeTaskFromStorage(newTaskDiv)
        newTaskDiv.parentNode.removeChild(newTaskDiv);
    });

    return deleteButton;
}