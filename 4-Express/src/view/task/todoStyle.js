import jss from 'jss';
import { shared } from '../../sharedStyle';

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
    label: {
        color: 'white',
        'flex-grow': 1,
        'margin-left': '5px',
        'font-size': '20px',
    },
    buttons: {
        'margin-left': '5px',
        border: 'none',
        'background-color': shared.background,
        color: shared.main,
        cursor: 'pointer',
    }
}

export const { classes } = jss.createStyleSheet(style).attach();