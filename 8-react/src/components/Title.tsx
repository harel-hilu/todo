import { Task } from '../../../common/Tasks';
import React from 'react';
import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';

export default function Title({tasks, showCompleted}: any) {
    const classes: Record<string, string> = useStyles();
    const tasksArray: Task[] = Object.values(tasks);
    const numOfTasks: number = tasksArray.length;
    const numOfDoneTasks: number = tasksArray.filter(task => task.isDone).length;
    const uncompletedTasks: number = numOfTasks - numOfDoneTasks;
    let textToShow = "Create a task";
    
    if (showCompleted) {
        if (numOfTasks > 0) {
            textToShow = `${numOfDoneTasks}/${numOfTasks} tasks`
        }
    } else if(uncompletedTasks > 0) {
        textToShow = `0/${uncompletedTasks} tasks`;
    }

    return (
        <div>
            <h1 className={classes.header}>
                {textToShow}
            </h1> 
        </div>
    );
}

Title.propTypes = {
    tasks: PropTypes.object,
    showCompleted: PropTypes.bool
}

const useStyles = createUseStyles({
    header: {
      color: 'red'
    }
});
  