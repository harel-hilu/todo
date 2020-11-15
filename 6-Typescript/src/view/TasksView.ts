import { Task } from "../model/Task";
import { MainView } from "./MainView";
import { sharedStyles } from "../sharedStyle";
import jss from "jss";
import jssCamelCase from "jss-plugin-camel-case";

const classes = getStyles();

export class TasksView {
    private tasksElements : HTMLElement;
    
    constructor() {
        this.tasksElements = document.getElementById("tasks");
    }

    render(tasks: Task[]) : void {
        this.tasksElements.innerHTML = "";
        tasks.forEach(task => this.addTaskToDom(task));
    }

    addTaskToDom(task : Task): void {
        const taskAreaId: string = task.id;
        const checkboxId: string = "checkbox" + task.id;
        const labelId: string = "label" + task.id;
        const editButtonId: string = "editButton" + task.id;
        const deleteButtonId: string = "deleteButton" + task.id;
        const checkedSignInDom: string = task.isDone ? "checked" : "";        

        this.tasksElements.insertAdjacentHTML("afterbegin",` 
            <div id=${taskAreaId} class=${classes.task}> 
                <input id=${checkboxId} class=${classes.checkbox} type="checkbox" ${checkedSignInDom} />
                <label id=${labelId} class=${classes.label} contenteditable=true>
                    ${task.text} 
                </label>
                <button id=${editButtonId} class=${classes.buttons}>Edit</button> 
                <button id=${deleteButtonId} class=${classes.buttons}>Delete</button>
            </div>
        `);

        const taskArea = document.getElementById(taskAreaId);
        const taskLabel = document.getElementById(labelId) as HTMLLabelElement;

        document.getElementById(checkboxId).addEventListener("click", 
            () => this.checkboxClicked(task));
        document.getElementById(editButtonId).addEventListener("click", 
            () => taskLabel.focus());
        document.getElementById(deleteButtonId).addEventListener("click", 
            () => this.deleteButtonClicked(taskArea));
        taskLabel.addEventListener("focusout", 
            () => this.labelUpdated(task, taskLabel.textContent));
    }

    private checkboxClicked(taskRelated: Task): void {
        taskRelated.isDone = !taskRelated.isDone;
    }
    
    private deleteButtonClicked(taskArea: HTMLElement): void {
        taskArea.parentNode.removeChild(taskArea);
    }
    
    private labelUpdated(taskRelated: Task, newText: string): void {
        taskRelated.text = newText;
    }
}

function getStyles() {
    const style = {
        checkbox: {
            height: "18px",
            width: "18px",
        },
        label: {
            color: sharedStyles.secondaryColor,
            flexGrow: 1,
            fontSize: "20px",
        },
        buttons: {
            backgroundColor: sharedStyles.backgroundColor,
            color: sharedStyles.mainColor,
            border: "none",
        },
        task: {
            display: "flex",
            marginTop: "8px",
            borderBottomStyle: 'solid',
            borderBottomColor: '#3d3d3d',
            borderBottomWidth: '1px',
        }
    }
    jss.use(jssCamelCase());

    return jss.createStyleSheet(style).attach().classes;
}