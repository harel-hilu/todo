import { v4 as uuidv4 } from 'uuid';

export class Task {
    constructor(taskId = uuidv4(), taskText = "", isTaskComplete = false) {
        this.id = taskId;
        this.text = taskText;
        this.isComplete = isTaskComplete;
    }
}