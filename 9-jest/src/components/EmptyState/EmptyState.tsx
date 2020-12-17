import { Task } from "../../../../common/Tasks";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {createUseStyles} from 'react-jss';
import { EmptyState } from "../../types/props";

export default function EmptyState() {
    const classes = useStyles();

    return (
        <div className={classes.container} data-hook="EmptyState" >
            <h4>
                Break your goals into simple tasks
            </h4>
            <p>
                Most of us set ambitious goals for ourselves. These could be over different periods, be it a month, quarter or a year. However, while goals are the result, the tasks that go into channeling the effort towards the goal have a higher probability of getting done when they find their way on a to-do list.
            </p>
        </div>
    );
}

const useStyles = createUseStyles({
    container: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        borderColor: "black",
        padding: "5px",
    }
});