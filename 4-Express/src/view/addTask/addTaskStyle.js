import jss from 'jss';
import { shared } from '../../sharedStyle.js'
import camal from 'jss-plugin-camel-case';
import extend from 'jss-plugin-extend';

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

export const { classes } = jss.createStyleSheet(style).attach();