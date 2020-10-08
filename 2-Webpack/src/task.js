import { v4 as uuidv4 } from 'uuid';

class Task {
    constructor({taskId, taskText = "", isTaskComplete = false}) {
        if (taskId === undefined) {
            this.id = uuidv4();
        }
    
        this.text = taskText;
        this.isComplete = isTaskComplete;
    }
  }

export {Task};