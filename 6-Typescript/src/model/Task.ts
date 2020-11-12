export class Task {
    text: string;
    isDone: boolean;
    id: string;

    constructor (text="", isDone=false, id) {
        this.text = text;
        this.isDone = isDone;
        this.id = id;
    }
}