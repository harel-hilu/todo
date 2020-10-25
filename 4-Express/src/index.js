import { Task } from "./model/Task";
import { NumOfTasksHeader } from "./view/header/NumOfTasksHeader.js";
import { AddTaskArea } from "./view/addTask/AddTaskArea.js";
import { TodoList } from "./view/task/TodoList.js";
import { getTasksFromServer, saveTasksToServer } from "./saver/saver.js";
import { shared, classes } from "./sharedStyle.js";

let todo = {};
const header = new NumOfTasksHeader();
const addTaskArea = new AddTaskArea();
const tasksArea = new TodoList();

document.body.classList.add(classes.body);
addTaskArea.addButton.addEventListener("click", () => addTaskHandler(addTaskArea.input.value));
addTaskArea.input.addEventListener("enterpressed", () => addTaskHandler(addTaskArea.input.value));

getTasksFromServer().then((data) => {
    todo = data;
    Object.values(todo).forEach(task => drawTask(task));
    setHeaderTitle();
});

const addTaskHandler = (text) => {
    if (text !== "") {
        const taskToAdd = new Task({taskText: text});
        todo[taskToAdd.id] = taskToAdd;
        drawTask(taskToAdd);
        setHeaderTitle();
        saveTasksToServer(todo);
        addTaskArea.input.value = "";
    }

    addTaskArea.input.focus();
}

function drawTask(taskToAdd) {
    const elements = tasksArea.addTaskToDom(taskToAdd);

    elements.editButton.addEventListener("click", 
        () => elements.editButton.parentNode.querySelector("label").focus());
    elements.checkbox.addEventListener("click", 
        () => checkboxClicked(taskToAdd, elements));
    elements.label.addEventListener("focusout", 
        () => labelChanged(elements.label, taskToAdd));
    elements.deleteButton.addEventListener("click", 
        () => deleteClicked(elements.deleteButton, taskToAdd.id));
}

const setHeaderTitle = () => {
    const values = Object.values(todo);
    header.setTitle(values.length, values.filter(task => task.isDone).length);
}

const checkboxClicked = (task, elements) => {
    task.isDone = elements.checkbox.checked;
    tasksArea.changeLabelColor(elements.label, task.isDone)
    setHeaderTitle();
    saveTasksToServer(todo);
};

const labelChanged = (label, task) => {
    task.text = label.textContent;
    saveTasksToServer(todo);
};
    
const deleteClicked = (deleteButton, id) => {
    delete todo[id];
    const taskDiv = deleteButton.parentNode;
    taskDiv.parentNode.removeChild(taskDiv);
    setHeaderTitle();
    addTaskArea.input.focus();
    saveTasksToServer(todo);
};
