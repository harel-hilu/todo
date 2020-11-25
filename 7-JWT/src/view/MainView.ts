import { TasksById, Task } from "../../../common/Tasks";
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

    render(tasks: TasksById): void {
        const tasksArray: Task[] = Object.values(tasks);
        
        for (const memberSubClass of Object.values(this)) {
            !memberSubClass.render || 
            memberSubClass.render.call(memberSubClass, tasksArray);
        }
        
        this.insertTaskView.clearInputAndFocus();
    }
}