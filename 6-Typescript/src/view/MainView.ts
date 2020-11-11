import { InsertTaskView } from "./InsertTaskView";
import { TasksView } from "./TasksView";

export class MainView {
    static insertTaskView = new InsertTaskView();
    static tasksView = new TasksView();
}