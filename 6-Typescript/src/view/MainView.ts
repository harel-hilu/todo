import { InsertTaskView } from "./InsertTaskView";
import { TasksView } from "./TasksView";

export class MainView {
    insertTaskView: InsertTaskView;
    tasksView: TasksView;

    constructor() {
        this.insertTaskView = new InsertTaskView();
        this.insertTaskView.focusOnInput();
        this.tasksView = new TasksView(this);
    }
    
    render(tasks){
        this.tasksView.render(tasks);
    }
}