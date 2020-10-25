import jss from 'jss';
import camal from 'jss-plugin-camel-case';
import extend from 'jss-plugin-extend';

jss.use(extend(), camal());

export const shared = {
    main: "#f62e47",
    background: "#1e1e1e",
    appWidth: "700px",
    globalButton: {
        marginLeft: 10,
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
    },
}

const style = {
    body: {
        background: shared.background,
        margin: 20,
        fontFamily: "system-ui",
    },
}

export const { classes } = jss.createStyleSheet(style).attach();