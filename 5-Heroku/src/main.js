import { Task } from "./model/Task.js";
import { AddTaskArea } from "./views/AddTaskArea.js";
import { NumOfTasksHeader } from "./views/NumOfTasksHeader.js";
import { TasksArea } from "./views/TasksArea.js";
import jss from "jss";
import jssCamelCase from 'jss-plugin-camel-case';
import { sharedStyles } from "./sharedStyles.js";
import { saveTaskToServer, getAllTasksFromServer, deleteTaskFromServer } from "./dataAccess/server-api.js";

new NumOfTasksHeader();
const addTaskArea = new AddTaskArea();
const tasksArea = new TasksArea();
setStyles();

(async function() {
    try {
        const tasks = await getAllTasksFromServer();
        tasks.forEach(addTaskToDom)
    } catch(err) {
        notifyUserAndLogError("Cannot get your tasks.", err)
    }
}());

addTaskArea.addAreaDiv.addEventListener("enterPressedOrButtonClicked", async () => {
    if (addTaskArea.getInputValue() !== "") {
        const taskToAdd = new Task(addTaskArea.getInputValue());
        try {
            const task = await saveTaskToServer(taskToAdd);
            addTaskToDom(task);
            addTaskArea.clearInput();
            addTaskArea.focusInput();
        } catch (error) {
            notifyUserAndLogError("Cannot create your task", error);
        }
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
    saveTaskToServer(taskAdded)
    .catch((err) => notifyUserAndLogError("Cannot update task on server", err));
}

const labelFocusOut = (taskAdded, newText) => {
    taskAdded.text = newText;
    saveTaskToServer(taskAdded).
    catch((err) => notifyUserAndLogError("Cannot update task on server", err));
}

const deleteButtonClicked = async (taskDiv) => {
    try {
       await deleteTaskFromServer(taskDiv.id); 
       taskDiv.parentNode.removeChild(taskDiv);
       addTaskArea.focusInput();
    } catch (error) {
        notifyUserAndLogError("cannot delete from server: ", error);
    }
}

function notifyUserAndLogError(errorToUser, errorToLog) {
    alert(errorToUser);
    console.log(errorToLog);
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