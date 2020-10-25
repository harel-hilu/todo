import jss from 'jss';

export const shared = {
    main: "#f62e47",
    // main: "#2D77F6",    
    background: "#1e1e1e",
    appWidth: "700px",
}

const style = {
    body: {
        background: shared.background,
        'font-family': "system-ui",
        margin: 20,
    },
}

export const { classes } = jss.createStyleSheet(style).attach();