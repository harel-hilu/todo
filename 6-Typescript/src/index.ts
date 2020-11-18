import { MainView } from "./view/MainView";
import { sharedStyles } from "./sharedStyle";
import { deleteTaskFromServer, getAllTasksFromServer, addTaskToServer, updateTaskOnServer }
    from "./dataAccess/server-api";
import jss from "jss";
import jssCamelCase from "jss-plugin-camel-case";
import { renderTasksIfTasksChanged } from "./domUpdater";
import { Task, NewTask, TasksById } from "./intefaces/Tasks";

let tasks: TasksById = {};
const mainView: MainView = new MainView(); 
setStyles();  

(async function main(): Promise<void> {
    try {
        tasks = await getAllTasksFromServer();
    } catch (error) {
        alert("we cannot get your tasks");
    }
})();

mainView.insertTaskView.insertTaskAreaElement
.addEventListener("userintentaddtask", async(): Promise<void> => {
    try {
        const task: NewTask = { 
            isDone: false, 
            text: mainView.insertTaskView.getInputText()
        };
        const taskWithId: Task = await addTaskToServer(task);
        tasks[taskWithId.id] = taskWithId;
    } catch (error) {
        alert("we cannot add your task");
    }
});

setInterval(() => renderTasksIfTasksChanged(tasks, mainView), 100);

export const updateTaskDoneStatus = async (task: Task): Promise<void> => {
    try {
        task.isDone = !task.isDone;
        await updateTaskOnServer(task);
    } catch (error) {
        alert("we cannot update your task")
    }
}

export const deleteTask = async (taskArea: HTMLElement): Promise<void> => {
    try {
        await deleteTaskFromServer(taskArea.id);
        taskArea.parentNode.removeChild(taskArea);
        delete tasks[taskArea.id];
    } catch (error) {
        alert("we cannot delete this task");
    }
}

export const updateTaskText = async(task: Task, newText: string): Promise<void> => {
    try {
        task.text = newText;
        await updateTaskOnServer(task);
    } catch (error) {
        alert("we cannot update your task");
    }
}

function setStyles(){
    const style = {
        app: {
            maxWidth: "600px",
            minHeight: "400px",
            padding: "10px",            
            fontFamily: "Helvetica",
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