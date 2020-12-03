import React from 'react';
import { Task } from '../../../common/Tasks';
import TaskLine from './TaskLine';
import PropTypes from 'prop-types';

export default function TasksList({tasks, updateTask, deleteTask, showCompleted}: any){
    const tasksArray: Task[] = Object.values(tasks);
    
    const rows: JSX.Element[] = tasksArray
        .filter((task: Task) => showCompleted || !task.isDone).map((task: Task) =>
            <div key={task.id}>
                <TaskLine 
                    taskToRender={task} 
                    updateTask={updateTask} 
                    deleteTask={deleteTask}
                />
            </div>
    );

    return (
        <div>
            {rows}
        </div>
    );
}

TasksList.propTypes = {
    tasks: PropTypes.object,
    updateTask: PropTypes.func,
    deleteTask: PropTypes.func,
    showCompleted: PropTypes.bool
}