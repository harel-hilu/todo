import { Task } from "./model/Task.js";
import { AddTaskArea } from "./views/AddTaskArea.js";
import { NumOfTasksHeader } from "./views/NumOfTasksHeader.js";
import { TasksArea } from "./views/TasksArea.js";
import { saveTaskToServer, getAllTasksFromServer, deleteTaskFromServer } from "./dataAccess/dataAccess.js";

let tasks = {};

const numOfTasksHeaderArea = new NumOfTasksHeader();
const addTaskArea = new AddTaskArea();
const tasksArea = new TasksArea();

getAllTasksFromServer().then(res=>{
    tasks = res.data;
    Object.values(tasks).forEach(task => addTaskToDom(task));
    numOfTasksHeaderArea.setTitle(tasks);
}).catch(err => alert("server error: " + err));

addTaskArea.buttonInputArea.addEventListener("enterPressedOrButtonClicked", () => {
    if (addTaskArea.inputAddTask.value !== "") {
        const taskToAdd = new Task(addTaskArea.inputAddTask.value, false);
        saveTaskToServer(taskToAdd).then(res => res.data).then(task => {
            tasks[task.id] = task;
            addTaskToDom(task);
            numOfTasksHeaderArea.setTitle(tasks);
            addTaskArea.inputAddTask.value = "";
            addTaskArea.inputAddTask.focus();
        }).catch(() => alert("cannot save task"))
    }
});

function addTaskToDom(taskToAdd) {
    const elements = tasksArea.addTask(taskToAdd);
    elements.checkbox.addEventListener("click", () => checkboxClicked(taskToAdd));
    elements.label.addEventListener("focusout",
        () => labelFocusOut(taskToAdd, elements.label.textContent));
    elements.editButton.addEventListener("click", () => elements.label.focus());
    elements.deleteButton.addEventListener("click", () => deleteButtonClicked(elements.taskDiv));
}

const checkboxClicked = (taskAdded) => {
    taskAdded.isDone = !taskAdded.isDone;
    numOfTasksHeaderArea.setTitle(tasks);
    saveTaskToServer(taskAdded).catch(() => alert("cannot update task on server"));
}

const labelFocusOut = (taskAdded, newText) => {
    taskAdded.text = newText;
    saveTaskToServer(taskAdded).catch(() => alert("cannot update task on server"));
}

const deleteButtonClicked = (taskDiv) => {
    deleteTaskFromServer(taskDiv.id).then(()=>{
        taskDiv.parentNode.removeChild(taskDiv);
        delete tasks[taskDiv.id];
        addTaskArea.inputAddTask.focus();
        numOfTasksHeaderArea.setTitle(tasks);
    }).catch(() => alert("cannot delete from server"));
}

