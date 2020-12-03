import { Task } from '../../../common/Tasks';
import React from 'react';
import {createUseStyles} from 'react-jss';

export default function Title(props: any) {
    const classes: Record<string, string> = useStyles();
    const tasksArray: Task[] = Object.values(props.tasks);
    const numOfTasks: number = tasksArray.length;

    return (
        <div>
            <h1 className={classes.header}>
                {
                    (numOfTasks > 0) ?
                    tasksArray.filter(task => task.isDone).length + 
                    "/" + numOfTasks + " tasks" :
                    "Create your first task!"
                }
            </h1> 
        </div>
    );
}

const useStyles = createUseStyles({
    header: {
      color: 'red'
    }
});
  