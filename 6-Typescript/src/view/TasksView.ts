import { Task } from "../model/Task";

export interface taskElements {
    taskArea: HTMLElement;
    taskCheckbox: HTMLInputElement;
    taskLabel: HTMLLabelElement;
    taskEditButton: HTMLButtonElement;
    taskDeleteButton: HTMLButtonElement;
}

export class TasksView {
    private tasks : HTMLElement;
    
    constructor() {
        this.tasks = document.getElementById("tasks");
    }

    addTaskToDom(task : Task): taskElements {
        const taskAreaId: string = task.id;
        const checkboxId: string = "checkbox" + task.id;
        const labelId: string = "label" + task.id;
        const editButtonId: string = "editButton" + task.id;
        const deleteButtonId: string = "deleteButton" + task.id;
        
        const checkedSignInDom: string = task.isDone ? "checked" : "";        
        this.tasks.insertAdjacentHTML("afterbegin",` 
            <div id=${taskAreaId}> 
                <input id=${checkboxId} type="checkbox" ${checkedSignInDom} />
                <label id=${labelId} contenteditable=true>
                    ${task.text} 
                </label>
                <button id=${editButtonId}>Edit</button> 
                <button id=${deleteButtonId}>Delete</button>
            </div>
        `);

        return {
            taskArea: document.getElementById(taskAreaId),
            taskCheckbox: document.getElementById(checkboxId) as HTMLInputElement,
            taskLabel: document.getElementById(labelId) as HTMLLabelElement,
            taskEditButton: document.getElementById(editButtonId) as HTMLButtonElement,
            taskDeleteButton: document.getElementById(deleteButtonId) as HTMLButtonElement
        }
    }
}