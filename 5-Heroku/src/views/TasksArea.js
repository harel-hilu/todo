import jss from 'jss';
import jssCamelCase from 'jss-plugin-camel-case';
import { sharedStyles } from '../sharedStyles.js';

const tasksDomId = "tasks";
const classes = getStyles();

export class TasksArea {
    constructor() {
        this.tasks = document.getElementById(tasksDomId);
        this.tasks.classList.add(classes.tasks);
    }

    addTask(task) {
        const checked = task.isDone ? "checked" : "";

        this.tasks.insertAdjacentHTML("afterbegin",` 
            <div id=${task.id} class=${classes.task}> 
                <input class="task ${classes.checkbox}" type=checkbox ${checked} />
                <label class="task ${classes.label}" contenteditable=true>
                    ${task.text} 
                </label>
                <button class="task ${classes.buttons}">Edit</button> 
                <button class="task ${classes.buttons}">Delete</button>
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