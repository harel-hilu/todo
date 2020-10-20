import jss from "jss";
import { shared } from "./../../appStyle.js";

const styles = {
    title: {
        color: shared.mainColor,
    }
}

export const { classes } = jss.createStyleSheet(styles).attach();