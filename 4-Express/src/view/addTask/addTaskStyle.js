import jss from 'jss';
import { shared } from '../../sharedStyle.js'

const style = {
    input: {
        'flex-grow': 1,
    },
    addButton: {
        'border-radius': '5px',
        border: 'none',
        padding: '7px',
        'margin-left': '10px',
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