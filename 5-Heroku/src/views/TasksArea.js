import jss from 'jss';
import { sharedStyles } from '../sharedStyles.js';

const domId = "tasks";
const classes = getStyles();

export class TasksArea {
    constructor() {
        this.tasks = document.getElementById(domId);
        this.tasks.classList.add(classes.tasks);
    }

    addTask(task) {
        const checked = task.isDone ? "checked" : "";

        this.tasks.insertAdjacentHTML("afterbegin",` 
            <div id=${task.id}> 
                <input class=task ${classes.checkbox} type=checkbox ${checked} />
                <label class=task contenteditable=true ${classes.label}>
                    ${task.text} 
                </label>
                <button class=task ${classes.buttons}> edit </button> 
                <button class=task ${classes.buttons}> delete </button>
            </div>
        `);

        const taskElement = document.getElementById(task.id);
        const elementsArray = taskElement.querySelectorAll(".task");

        return {
            taskDiv: taskElement,
            checkbox: elementsArray[0],
            label: elementsArray[1],
            editButton: elementsArray[2],
            deleteButton: elementsArray[3],
        }
    }
}

function getStyles() {
    const style = {
        checkbox: {
            color: sharedStyles.mainColor,
        },
        label: {
            color: "red",
        },
        buttons: {
            color: "red",
        }
    }
    
    return jss.createStyleSheet(style).attach().classes;
}