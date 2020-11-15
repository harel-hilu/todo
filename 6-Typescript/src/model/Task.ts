type GUID = string;

export class Task {
    text: string;
    isDone: boolean;
    id: GUID;

    constructor (text="", isDone=false, id: GUID) {
        this.text = text;
        this.isDone = isDone;
        this.id = id;
    }
}