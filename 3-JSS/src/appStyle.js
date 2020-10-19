import jss from "jss";

const styles = {
    app: {
        background: "#282827",
        'font-family': "Helvetica",
        'max-width': '800px',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'min-height': '400px',
        'padding-left': '20px',
        'padding-top': '1px',
    }
}

export const { classes } = jss.createStyleSheet(styles).attach();