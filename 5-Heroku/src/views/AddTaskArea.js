import jss from 'jss';
import jssCamelCase from 'jss-plugin-camel-case'
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
        container: {
            display: "flex",
            color: sharedStyles.secondaryColor,
            marginBottom: "20px",
        },
        taskInput: {
            flexGrow: 1,
            maxWidth: "400px",
            color: sharedStyles.backgroundColor,
            borderRadius: "5px",
            border: "none",
            paddingLeft: "5px",
        },
        addButton: {
            color: sharedStyles.backgroundColor,
            alignSelf: "flex-end",
            marginRight: "5px",
            marginLeft: "auto",
            border: "none",
            backgroundColor: sharedStyles.mainColor,
            borderRadius: "5px",
            height: 24,
        },
    }

    jss.use(jssCamelCase());

    return jss.createStyleSheet(style).attach().classes;
}