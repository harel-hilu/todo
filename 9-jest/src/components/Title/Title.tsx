import React from 'react';
import PropTypes from 'prop-types';
import {createUseStyles} from 'react-jss';
import { TitleProps } from "../../types/props"

export default function Title({doneTasks, totalTasks}: TitleProps) {
    const classes = useStyles();

    return (
        <h1 className={classes.header} id="title">
            {totalTasks ? doneTasks + "/" + totalTasks + " tasks" :
                         "Create your first task" }
        </h1>
    );
}

Title.propTypes = {
    doneTasks: PropTypes.number,
    totalTasks: PropTypes.number
}

const useStyles = createUseStyles({
    header: {
      color: 'red'
    }
});