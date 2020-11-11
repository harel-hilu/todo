export class InsertTaskView {
    private buttonAddTask: HTMLButtonElement;
    private inputInsertTask: HTMLInputElement;
    insertTaskAreaElement: HTMLElement;
    userIntentAddTaskEvent: Event;

    constructor() {
        this.inputInsertTask = document.getElementById("inputInsertTask") as HTMLInputElement;
        this.buttonAddTask = document.getElementById("buttonAddTask") as HTMLButtonElement;
        this.insertTaskAreaElement = document.getElementById("insertTaskArea");
        this.userIntentAddTaskEvent = new Event("userintentaddtask");

        this.buttonAddTask.addEventListener("click", (): void => {
            if (this.inputInsertTask.value !== "") {
                this.insertTaskAreaElement.dispatchEvent(this.userIntentAddTaskEvent);
            }
        });
        this.inputInsertTask.addEventListener("keydown", (e): void => {
            if (e.code === "Enter" && this.inputInsertTask.value !== "") {
                this.insertTaskAreaElement.dispatchEvent(this.userIntentAddTaskEvent);
            }
        })
    }

    getInputText(): string {
        return this.inputInsertTask.value;
    }
    focusOnInput(): void {
        this.inputInsertTask.focus();
    }
    clearInput(): void {
        this.inputInsertTask.value = "";
    }
    clearInputAndFocus(): void {
        this.clearInput();
        this.focusOnInput();
    }
}