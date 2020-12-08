import React from 'react';
import { Task } from '../../../common/Tasks';
import TaskLine from './TaskLine';
import PropTypes from 'prop-types';

export default function TasksList({tasks, updateTask, deleteTask}: any){
    const rows: JSX.Element[] = tasks.map((task: Task) =>
        <TaskLine 
            key={task.id}
            task={task} 
            updateTask={updateTask} 
            deleteTask={deleteTask}
        />
    );

    return (
        <div>
            {rows}
        </div>
    );
}

TasksList.propTypes = {
    tasks: PropTypes.array,
    updateTask: PropTypes.func,
    deleteTask: PropTypes.func
}