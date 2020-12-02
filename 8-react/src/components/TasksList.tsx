import React from 'react';
import { Task } from '../../../common/Tasks';
import TaskLine from './TaskLine';

export default function TasksList(props: any) {
    const rows: JSX.Element[] = [];
    const tasksArray: Task[] = Object.values(props.tasks);
    
    tasksArray.forEach((task: Task) => {
        rows.push(
            <div key={task.id}>
                <TaskLine 
                    task={task} 
                    updateTask={props.updateTask} 
                    deleteTask={props.deleteTask}
                />
            </div>
        );
    });

    return (
        <div>
            {rows}
        </div>
    );
}