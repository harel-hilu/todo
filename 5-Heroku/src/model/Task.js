export class Task {
    constructor(text = "", isDone = false, id = -1) {
        this.id = id;
        this.text = text;
        this.isDone = isDone;
    }
}