import { classes } from "./appStyle.js";
import {createAppHeader} from "./views/headerDom.js";
import {createTaskElement, createTaskCheckbox, createTaskDeleteButton, createTaskEditButton, createTaskLabel, createTasksArea, appendTaskToArea, changeLabelColor} from './views/taskDom.js';
import {getNewTaskInputElement, getNewTaskInputText, isEmptyNewTaskInput, focusNewTaskInput, clearNewTaskInput, createAddTaskArea, getAddTaskButton} from "./views/insertTaskDom.js";
import {TodoList} from "./objects/todoList.js";

const todo = new TodoList();

window.addEventListener("load", () => {
    createAppHeader();
    createAddTaskArea();
    createTasksArea();
    document.getElementById("app").classList.add(classes.app);

    getAddTaskButton().addEventListener("click", addTaskHandler);
    getNewTaskInputElement().addEventListener("keydown", (e) => { 
        if (e.code === "Enter"){
            addTaskHandler();
        }
    })
    
    Object.values(todo.tasks).forEach(drawTask);
    createAppHeader(todo.countTasks(), todo.countDoneTasks());
});

const addTaskHandler = () => {
    if (!isEmptyNewTaskInput()){
        drawTask(todo.addTask(undefined, getNewTaskInputText(), false));
        createAppHeader(todo.countTasks(), todo.countDoneTasks());
        clearNewTaskInput();
    }    
    
    focusNewTaskInput();    
};

const drawTask = (taskToAdd) => {
    const taskElement = createTaskElement(taskToAdd.id);

    const isDoneTaskCheckbox = createTaskCheckbox(taskToAdd.isComplete);
    isDoneTaskCheckbox.addEventListener("click", (e) => taskCheckboxClicked(e, taskToAdd.id));

    const taskLabel = createTaskLabel(taskToAdd);
    taskLabel.addEventListener("focusout", (e) => taskToAdd = taskLabelFocusOut(e, taskToAdd.id));

    const taskEditButton = createTaskEditButton(taskElement);
    taskEditButton.addEventListener("click", () => editTaskClicked(taskElement));

    const taskDeleteButton = createTaskDeleteButton(taskElement);
    taskDeleteButton.addEventListener("click", () => deleteTaskClicked(taskElement));

    taskElement.append(isDoneTaskCheckbox);
    taskElement.append(taskLabel);
    taskElement.append(taskEditButton);
    taskElement.append(taskDeleteButton);
    appendTaskToArea(taskElement);
};

const taskCheckboxClicked = (e, taskId) => {
    todo.addTask(taskId, todo.tasks[taskId].text, e.target.checked);
    createAppHeader(todo.countTasks(), todo.countDoneTasks());
    changeLabelColor(e.target.parentNode.querySelector("label"), todo.tasks[taskId].isComplete);
}

const editTaskClicked = (taskElement) => taskElement.querySelector("label").focus();

const taskLabelFocusOut = (e, taskId) => todo.addTask(taskId, e.target.innerHTML, todo.tasks[taskId].isComplete);

const deleteTaskClicked = (taskElement) => {
    taskElement.parentNode.removeChild(taskElement);
    todo.removeTask(taskElement.id);
    createAppHeader(todo.countTasks(), todo.countDoneTasks());
    focusNewTaskInput();
};