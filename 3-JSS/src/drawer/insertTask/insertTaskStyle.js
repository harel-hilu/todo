import jss from "jss";
import { shared } from "./../../appStyle.js";

const styles = {
    insertTask: {
        display: 'flex',
        'margin-bottom': '10px'
    },
    input: {
        'flex-grow': 1,
        'max-width': '500px',
        'margin-right': '20px',
        'border': 'none',
        'padding': '10px',
    },
    addButton: {
        padding: '10px',
        'text-transform': 'uppercase',
        'border-radius': '10px',
        border: 'none',
        color: "white",
        'background-color': shared.mainColor
    }
}

export const { classes } = jss.createStyleSheet(styles).attach();