import jss from 'jss';
import { shared } from '../sharedStyle.js'
import camal from 'jss-plugin-camel-case';
import extend from 'jss-plugin-extend';

const classes = getStyles();

export class AddTaskArea {
    constructor() {
        this.input = document.createElement("input");
        this.addButton = document.createElement("button");
        const addArea = document.createElement("div");
        addArea.classList.add(classes.addArea);

        this.input.setAttribute("class", classes.input);
        this.input.setAttribute("placeholder", "insert a task");
        addArea.append(this.input);
        
        this.addButton.setAttribute("class", classes.addButton);
        this.addButton.appendChild(document.createTextNode("ADD TASK"));
        addArea.append(this.addButton);

        document.body.append(addArea);
        
        const enterEvent = new Event("enterpressed");
        this.input.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.input.dispatchEvent(enterEvent);
            }
        });
        
        this.input.focus();
    }
}

function getStyles() {
    jss.use(extend(), camal());
    const style = {
        input: {
            'flex-grow': 1,
        },
        addButton: {
            extend: shared.globalButton,
            padding: '7px',
            'background-color': shared.main,
            'color': 'white',
        },
        addArea: {
            'max-width': shared.appWidth,
            display: 'flex',
            'margin-bottom': '20px',
        }
    }
    
    return jss.createStyleSheet(style).attach().classes;
}