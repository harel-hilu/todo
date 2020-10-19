import jss from "jss";

const styles = {
    task: {
        'margin-top': 10,
        display: 'flex',
    },
    label: {
        'color': "white",
        'flex-grow': 1
    },
    checkbox: {

    },
    buttons: {
        'margin-right': 10
    }
}

export const { classes } = jss.createStyleSheet(styles).attach();