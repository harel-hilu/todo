import { Task } from '../../../common/Tasks';
import React from 'react';
import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';

export default function Title({tasks, showCompleted}: any) {
    const classes: Record<string, string> = useStyles();
    let textToShow = "Create a task";
    const tasksArray: Task[] = Object.values(tasks);
    const numOfTasks: number = tasksArray.length;
    const numOfDoneTasks: number = tasksArray.filter(task => task.isDone).length;
    const uncompletedTasks: number = numOfTasks - numOfDoneTasks;
    
    if (showCompleted) {
        if (numOfTasks > 0) {
            textToShow = `${numOfDoneTasks}/${numOfTasks} tasks`
        }
    } else if(uncompletedTasks > 0) {
        textToShow = `${uncompletedTasks} tasks`;
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
  