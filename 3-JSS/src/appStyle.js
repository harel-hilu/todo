import jss from "jss";

export const shared = {
    mainColor: "#ff9500",
    backgroundColor: "#282827",
};

const styles = {
    app: {
        background: shared.backgroundColor,
        'font-family': "Helvetica",
        'max-width': '800px',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'min-height': '400px',
        'padding': '10px',
    }
}


export const { classes } = jss.createStyleSheet(styles).attach();