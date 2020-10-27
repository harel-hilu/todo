import { shared } from '../sharedStyle.js'
import jss from 'jss';
import camal from 'jss-plugin-camel-case';
import extend from 'jss-plugin-extend';

const classes = getStyles();

export class TodoList {
    constructor() {
        this.tasks = document.createElement("div");
        document.body.append(this.tasks);
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
        
        this.changeLabelColor(elements.label, task.isDone);
        
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
        this.tasks.append(taskDiv);

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

    changeLabelColor(label, isDone) {
        if (isDone) {
            label.classList.add(classes.labelChecked);
            label.classList.remove(classes.labelNotChecked);    
        } else {
            label.classList.add(classes.labelNotChecked);    
            label.classList.remove(classes.labelChecked);
        }
        
    }
}


function getStyles() {
    jss.use(extend(), camal());
    const style = {
        task: {
            display: 'flex',
            'max-width': shared.appWidth,
            'margin-top': '5px',
            'border-bottom-style': 'solid',
            'border-bottom-color': '#3d3d3d',
            'border-bottom-width': '1px',
        },
        checkbox: {
            height: '20px',
            width: '20px',
        },
        labelChecked: {
            color: '#a0a0a0',
            'text-decoration': 'line-through'
        },
        labelNotChecked: {
            color: 'white',
        },
        label: {
            'flex-grow': 1,
            'margin-left': '5px',
            'font-size': '20px',
        },
        buttons: {
            extend: shared.globalButton,
            'background-color': shared.background,
            color: shared.main,
        }
    }

    return jss.createStyleSheet(style).attach().classes;
}
