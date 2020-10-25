import jss from 'jss';
import { shared } from '../../sharedStyle';
import camal from 'jss-plugin-camel-case';
import extend from 'jss-plugin-extend';

jss.use(extend(), camal());

const style = {
    task: {
        display: 'flex',
        'max-width': shared.appWidth,
        'margin-top': '5px',
        'border-bottom-style': 'solid',
        'border-bottom-color': '#3d3d3d',
        'border-bottom-width': '1px',
    },
    checkbox: {
        height: '20px',
        width: '20px',
    },
    labelChecked: {
        color: '3d3d3d',
    },
    labelNotChecked: {
        color: 'white',
    },
    label: {
        'flex-grow': 1,
        'margin-left': '5px',
        'font-size': '20px',
    },
    buttons: {
        extend: shared.globalButton,
        'background-color': shared.background,
        color: shared.main,
    }
}

export const { classes } = jss.createStyleSheet(style).attach();