import { Task } from '../../../common/Tasks';
import React from 'react';
import {createUseStyles} from 'react-jss';

export default function Title(props: any) {
    const classes = useStyles();
    const tasksArray: Task[] = Object.values(props.tasks);
    const numOfTasks = tasksArray.length;

    const element: JSX.Element = (numOfTasks > 0) ? 
        <h1 className={classes.header}>
            {tasksArray.filter(task => task.isDone).length}/{numOfTasks} tasks
        </h1> :
        <h1 className={classes.header}>Create your first task!</h1>;

    return (
        <div>
            {element}
        </div>
    );
}

const useStyles = createUseStyles({
    header: {
      color: 'red'
    }
});
  