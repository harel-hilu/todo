import { MainView } from "./view/MainView";
import { Task } from "./model/Task";
import { sharedStyles } from "./sharedStyle";
import jss from "jss";
import jssCamelCase from "jss-plugin-camel-case";

let i=0;
let previousTasks: Task[] = [];
const tasks: Task[] = [];

const mainView: MainView = new MainView(); 
setStyles();

mainView.insertTaskView.insertTaskAreaElement
    .addEventListener("userintentaddtask", () => {
    const taskToAdd: Task = new Task(mainView.insertTaskView.getInputText(), false, (i++).toString());
    tasks.push(taskToAdd);
    mainView.insertTaskView.clearInputAndFocus();
});

setInterval(renderTasksIfTasksChanged, 100);
function renderTasksIfTasksChanged() {
    if (JSON.stringify(previousTasks) !== JSON.stringify(tasks)) {
        previousTasks = [...tasks];
        mainView.render(tasks);
    }
}

function setStyles(){
    const style = {
        app: {
            maxWidth: "600px",
            minHeight: "400px",
            padding: "10px",            
            fontFamily: "Helvetica",
        },
        body: {
            backgroundColor: sharedStyles.backgroundColor,
        }
    }

    jss.use(jssCamelCase());

    const classes = jss.createStyleSheet(style).attach().classes;
    document.getElementById("app").classList.add(classes.app);
    document.body.classList.add(classes.body);
}