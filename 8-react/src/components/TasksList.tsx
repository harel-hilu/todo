import React from 'react';
import { Task } from '../../../common/Tasks';
import TaskLine from './TaskLine';
import PropTypes from 'prop-types';

export default function TasksList(props: any) {
    const tasksArray: Task[] = Object.values(props.tasks);
    
    const rows: JSX.Element[] = tasksArray.map((task: Task) => {
        return (
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

TasksList.propTypes = {
    tasks: PropTypes.object,
    updateTask: PropTypes.func,
    deleteTask: PropTypes.func
}