import { v4 as uuidv4 } from 'uuid';

class Task {
    constructor(taskId, taskText = "", isTaskComplete = false) {
        taskId === undefined ? this.id = uuidv4() : this.id = taskId;    
        this.text = taskText;
        this.isComplete = isTaskComplete;
    }

  }

export {Task};