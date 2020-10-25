import { v4 } from 'uuid';

export class Task {
    constructor({taskId = v4(), taskText = "", taskIsDone = false}) {
        this.id = taskId;
        this.text = taskText;
        this.isDone = taskIsDone;
    }
}