import { Task } from "./model/Task.js";
import { AddTaskArea } from "./views/AddTaskArea.js";
import { NumOfTasksHeader } from "./views/NumOfTasksHeader.js";
import { TasksArea } from "./views/TasksArea.js";
import jss from "jss";
import jssCamelCase from 'jss-plugin-camel-case';
import { sharedStyles } from "./sharedStyles.js";
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

setStyles();

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

function setStyles(){
    const style = {
        app: {
            maxWidth: "600",
            minHeight: "400px",
            padding: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "Helvetica",
            borderStyle: 'solid',
            borderColor: sharedStyles.mainColor,
            borderBottomWidth: '1px',
        },
        body: {
            backgroundColor: sharedStyles.backgroundColor,
        }
    }

    jss.use(jssCamelCase());

    const classes = jss.createStyleSheet(style).attach().classes;
    document.getElementById("app").classList.add(classes.app);
    document.body.classList.add(classes.body);
}