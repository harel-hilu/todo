import { classes } from "./todoStyle.js";
import { shared } from '../../sharedStyle.js'

export class TodoList {
    constructor() {
        this.todo = document.createElement("div");
        document.body.append(this.todo);
    }

    addTaskToDom(task) {
        const elements = {
            checkbox: this.createCheckbox(task.isDone),
            label: this.createTaskLabel(task.text),
            editButton: this.createTaskButton("Edit"),
            deleteButton: this.createTaskButton("Delete"),
        };
        
        const taskDiv = this.createTaskDiv(task.id);

        for (const iterator of Object.values(elements)) {
            taskDiv.append(iterator);
        }
        
        return elements;
    }
  
    createTaskButton(text) {
        const button = document.createElement("button");
        button.appendChild(document.createTextNode(text));
        button.setAttribute("class", classes.buttons);

        return button;
    }

    createTaskLabel(text) {
        const taskLabel = document.createElement("label");
        taskLabel.appendChild(document.createTextNode(text));
        taskLabel.setAttribute("class", classes.label);
        taskLabel.setAttribute("contenteditable", true);

        return taskLabel;
    }

    createTaskDiv(id) {
        const taskDiv = document.createElement("div");
        taskDiv.setAttribute("id", id);
        taskDiv.setAttribute("class", classes.task);
        this.todo.append(taskDiv);

        return taskDiv;
    }

    createCheckbox(isTaskDone) {
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", classes.checkbox);

        if (isTaskDone) {
            checkbox.setAttribute("checked", "checked");
        }

        return checkbox;
    }
}