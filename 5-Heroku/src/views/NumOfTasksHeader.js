import jss from 'jss';
import { sharedStyles } from '../sharedStyles.js';

const domId = "numOfTasksHeader";
const classes = getStyles();

export class NumOfTasksHeader {
    constructor() {
        this.header = document.getElementById(domId); 
        this.header.classList.add(classes.header);
    }

    setTitle(tasks) {
        const tasksValues = Object.values(tasks);

        if (tasksValues.length === 0) {
            this.header.innerHTML = 'Insert Your First Task';
        } else {
            const numOfDoneTasks = tasksValues.filter(task => task.isDone).length;
            this.header.innerHTML = `${numOfDoneTasks}/${tasksValues.length} Tasks`;
        }
    }
}

function getStyles() {
    const style = {
        header: {
            color: sharedStyles.mainColor,
            textAlign: "center",
            textDecoration: "underline",
        }
    }
    
    return jss.createStyleSheet(style).attach().classes;
}