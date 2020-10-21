import jss from "jss";
import { shared } from "./../../appStyle.js";

const styles = {
    task: {
        'padding-top': '5px',
        'padding-bottom': '5px',
        'display': 'flex',
        'border-bottom-style': 'solid',
        'border-bottom-color': '#3d3d3d',
        'border-bottom-width': '1px',
    },
    label: {
        'color': "white",
        'margin-left': '5px',
        'margin-top': 'auto',
        'margin-bottom': 'auto',
        'vertical-align': 'middle',
        'flex-grow': 1
    },
    checkbox: {
        'width': '20px',
        'height': '20px',
        'cursor': 'pointer',
        'background-color': 'black',
    },
    buttons: {
        'margin-left': '10px',
        'border-color': shared.mainColor,
        'border-radius': '5px',
        'border': 'none',
        'background-color': 'white',
        'color': shared.backgroundColor,
    },
    checkedLabel: {
        'color': '#a0a0a0',
    }
}

export const { classes } = jss.createStyleSheet(styles).attach();