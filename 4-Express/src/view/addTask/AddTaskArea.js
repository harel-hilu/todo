import { classes } from "./addTaskStyle.js";

export class AddTaskArea {
    constructor() {
        this.input = document.createElement("input");
        this.addButton = document.createElement("button");
        const addArea = document.createElement("div");
        addArea.classList.add(classes.addArea);

        this.input.setAttribute("class", classes.input);
        this.input.setAttribute("placeholder", "insert a task");
        addArea.append(this.input);
        
        this.addButton.setAttribute("class", classes.addButton);
        this.addButton.appendChild(document.createTextNode("ADD TASK"));
        addArea.append(this.addButton);

        document.body.append(addArea);
        
        const enterEvent = new Event("enterpressed");
        this.input.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.input.dispatchEvent(enterEvent);
            }
        });
        
        this.input.focus();
    }
}