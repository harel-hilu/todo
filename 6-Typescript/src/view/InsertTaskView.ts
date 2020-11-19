import { sharedStyles } from "../sharedStyle";
import jss from "jss";
import jssCamelCase from "jss-plugin-camel-case";
import { Task } from "../../../common/Tasks";

export class InsertTaskView {
    private buttonAddTask: HTMLButtonElement;
    private inputInsertTask: HTMLInputElement;
    private header: HTMLElement;
    insertTaskAreaElement: HTMLElement;
    userIntentAddTaskEvent: Event;

    constructor() {
        setStyles();
        this.inputInsertTask = document.getElementById("inputInsertTask") as HTMLInputElement;
        this.buttonAddTask = document.getElementById("buttonAddTask") as HTMLButtonElement;
        this.header = document.getElementById("numOfTasksHeader");
        this.insertTaskAreaElement = document.getElementById("insertTaskArea");
        this.userIntentAddTaskEvent = new Event("userintentaddtask");

        this.buttonAddTask.addEventListener("click", (): void => {
            if (this.getInputText() !== "") {
                this.insertTaskAreaElement.dispatchEvent(this.userIntentAddTaskEvent);
            }
        });
        this.inputInsertTask.addEventListener("keydown", (e: KeyboardEvent): void => {
            if (e.code === "Enter" && this.getInputText() !== "") {
                this.insertTaskAreaElement.dispatchEvent(this.userIntentAddTaskEvent);
            }
        })
    }

    getInputText(): string {
        return this.inputInsertTask.value;
    }

    clearInputAndFocus(): void {
        this.inputInsertTask.value = "";
        this.inputInsertTask.focus();
    }

    render(tasks: Task[]): void {
        this.header.innerHTML = (tasks.length === 0) ? "Insert Your First Task" :
            tasks.filter((task) => task.isDone).length + "/" + tasks.length + " tasks";
    }
}

function setStyles(): void {
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
        header: {
            color: sharedStyles.mainColor,
            fontSize: "200%"
        }
    }

    jss.use(jssCamelCase());
    const classes = jss.createStyleSheet(style).attach().classes;
    document.getElementById("inputInsertTask").classList.add(classes.taskInput);
    document.getElementById("buttonAddTask").classList.add(classes.addButton);
    document.getElementById("insertTaskArea").classList.add(classes.container);
    document.getElementById("numOfTasksHeader").classList.add(classes.header);
}