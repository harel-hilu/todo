import jss from 'jss';
import { shared } from '../../sharedStyle.js'

const style = {
    title: {
        color: shared.main,
    }
}

export const { classes } = jss.createStyleSheet(style).attach();