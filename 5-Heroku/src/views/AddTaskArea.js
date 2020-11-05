import jss from 'jss';
import { sharedStyles } from '../sharedStyles.js';

const addTaskAreaDomId = "addTaskArea";
const inputAddTaskDomId = "newTaskText";
const buttonAddTaskDomId = "addTaskButton";
const classes = getStyles();

export class AddTaskArea {
    constructor() {
        this.inputAddTask = document.getElementById(inputAddTaskDomId);
        this.buttonAddTask = document.getElementById(buttonAddTaskDomId);
        this.buttonInputArea = document.getElementById(addTaskAreaDomId);
        this.addTaskEvent = new Event("enterPressedOrButtonClicked");

        this.buttonAddTask.addEventListener("click", () => {
            this.buttonInputArea.dispatchEvent(this.addTaskEvent);
        });
        this.inputAddTask.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.buttonInputArea.dispatchEvent(this.addTaskEvent);    
            }
        });
        
        this.inputAddTask.classList.add(classes.taskInput);
        this.buttonAddTask.classList.add(classes.addButton);
        this.buttonInputArea.classList.add(classes.container);

        this.inputAddTask.focus();
    }
}

function getStyles() {
    const style = {
        addButton: {
            color: sharedStyles.mainColor,
        },
        taskInput: {
            color: sharedStyles.mainColor,
        },
        container: {
            color: sharedStyles.secondaryColor,
        }
    }

    return jss.createStyleSheet(style).attach().classes;
}