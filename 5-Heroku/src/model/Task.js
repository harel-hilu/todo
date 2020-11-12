export class Task {
    constructor(text = "", isDone = false, id) {
        this.id = id;
        this.text = text;
        this.isDone = isDone;
    }
}