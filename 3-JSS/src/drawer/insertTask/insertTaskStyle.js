import jss from "jss";

const styles = {
    insertTask: {
        display: 'flex',
    },
    input: {
        'flex-grow': 1,
        'max-width': '500px',
        'margin-right': '20px'
    }
}

export const { classes } = jss.createStyleSheet(styles).attach();