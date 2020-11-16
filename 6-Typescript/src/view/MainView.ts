import { InsertTaskView } from "./InsertTaskView";
import { TasksView } from "./TasksView";

export class MainView {
    insertTaskView: InsertTaskView;
    tasksView: TasksView;

    constructor() {
        this.insertTaskView = new InsertTaskView();
        this.insertTaskView.clearInputAndFocus();
        this.tasksView = new TasksView();
    }
    
    render(tasks){
        this.tasksView.render(tasks);
        this.insertTaskView.render(tasks);
    }
}