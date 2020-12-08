import { MainView } from "./view/MainView";
import { sharedStyles } from "./sharedStyle";
import { deleteTaskFromServer, getAllTasksFromServer, addTaskToServer, updateTaskOnServer }
    from "./dataAccess/server-api";
import jss from "jss";
import jssCamelCase from "jss-plugin-camel-case";
import { Task, NewTask, TasksById } from "../../../common/Tasks";

let tasks: TasksById = {};
const mainView: MainView = new MainView(); 
setStyles();  

(async (): Promise<void> => {
    try {
        tasks = await getAllTasksFromServer();
        mainView.render(tasks);
    } catch (error) {
        alert("we cannot get your tasks");
    }
})();

mainView.insertTaskView.insertTaskAreaElement
    .addEventListener("userintentaddtask", async(): Promise<void> => {

    try {
        const newTask: NewTask = { 
            isDone: false, 
            text: mainView.insertTaskView.getInputText()
        };
        const taskToAdd: Task = await addTaskToServer(newTask);
        tasks[taskToAdd.id] = taskToAdd;
        mainView.render(tasks);
    } catch (error) {
        alert("we cannot add your task");
    }
});

export const updateTaskDoneStatus = async (task: Task): Promise<void> => {
    try {
        task.isDone = !task.isDone;
        await updateTaskOnServer(task);
        mainView.render(tasks);
    } catch (error) {
        alert("we cannot update your task")
    }
}

export const deleteTask = async (taskArea: HTMLElement): Promise<void> => {
    try {
        await deleteTaskFromServer(taskArea.id);
        taskArea.parentNode.removeChild(taskArea);
        delete tasks[taskArea.id];
        mainView.render(tasks);
    } catch (error) {
        alert("we cannot delete this task");
    }
}

export const updateTaskText = async(task: Task, newText: string): Promise<void> => {
    try {
        task.text = newText;
        await updateTaskOnServer(task);
        mainView.render(tasks);
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