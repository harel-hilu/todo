import jss from 'jss';
import { sharedStyles } from '../sharedStyles.js';

const headerDomId = "numOfTasksHeader";
const classes = getStyles();

export class NumOfTasksHeader {
    constructor() {
        this.header = document.getElementById(headerDomId); 
        this.header.classList.add(classes.header);
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