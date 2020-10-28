import { Task } from "./model/Task.js";
import { NumOfTasksHeader } from "./views/NumOfTasksHeader.js";
import { AddTaskArea } from "./views/AddTaskArea.js";
import { TodoList } from "./views/TodoList.js";
import { deleteTaskFromServer, getAllTasksFromServer, saveTaskToServer } from "./dataAccess/serverAccess.js";
import { classes } from "./sharedStyle.js";

let tasks = {};
const headerArea = new NumOfTasksHeader();
const addTaskArea = new AddTaskArea();
const tasksArea = new TodoList();

document.body.classList.add(classes.body);
addTaskArea.addButton.addEventListener("click", () => addTaskHandler(addTaskArea.input.value));
addTaskArea.input.addEventListener("enterpressed", () => addTaskHandler(addTaskArea.input.value));

getAllTasksFromServer().then((data) => {
    tasks = data;
    Object.values(tasks).forEach(task => drawTask(task));
    setHeaderTitle();
}).catch(notifyError);

const addTaskHandler = (text) => {
    if (text !== "") {
        const taskToAdd = new Task({taskText: text});
        saveTaskToServer(taskToAdd).then(() => {
            tasks[taskToAdd.id] = taskToAdd;
            drawTask(taskToAdd);
            setHeaderTitle();
        }).catch(notifyError);

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
    const values = Object.values(tasks);
    headerArea.setTitle(values.length, values.filter(task => task.isDone).length);
}

const checkboxClicked = (task, elements) => {
    task.isDone = elements.checkbox.checked;
    tasksArea.changeLabelColor(elements.label, task.isDone)
    setHeaderTitle();
    saveTaskToServer(task).catch(notifyError);
};

const labelChanged = (label, task) => {
    task.text = label.textContent;
    saveTaskToServer(task).catch(notifyError);
};
    
const deleteClicked = (deleteButton, id) => {
    deleteTaskFromServer(id).then(() => {
        delete tasks[id];
        const taskDiv = deleteButton.parentNode;
        taskDiv.parentNode.removeChild(taskDiv);
        setHeaderTitle();
    }).catch(notifyError);
    
    addTaskArea.input.focus();
};

function notifyError (err) {
    console.log(err);
    alert("Server is not responding. Please try again later!");
} 
