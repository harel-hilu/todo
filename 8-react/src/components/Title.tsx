import { Task } from '../../../common/Tasks';
import React from 'react';

export default function Title(props: any) {
    const tasksArray: Task[] = Object.values(props.tasks);
    const numOfTasks = tasksArray.length;

    const element: JSX.Element = (numOfTasks > 0) ? 
        <h1>{tasksArray.filter(task => task.isDone).length}/{numOfTasks} tasks</h1> :
        <h1>Create your first task!</h1>;

    return (
        <div>
            {element}
        </div>
    );
}