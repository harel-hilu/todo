import jss from 'jss';
import { shared } from '../sharedStyle.js'

const classes = getStyles();

export class NumOfTasksHeader {
    constructor(numOfTasks = 0, numOfCompletedTasks = 0) {
        this.title = document.createElement("h1");
        this.title.setAttribute("class", classes.title);
        this.setTitle(numOfTasks, numOfCompletedTasks);
        document.body.append(this.title);
    }

    setTitle(numOfTasks, numOfCompletedTasks){
        this.title.innerHTML = (numOfTasks === 0) ? 
            "Create Your First Task!" : `${numOfCompletedTasks} / ${numOfTasks} Tasks`
    }
}

function getStyles() {
    const style = {
        title: {
            color: shared.main,
        }
    }
    
    return jss.createStyleSheet(style).attach().classes;
}
