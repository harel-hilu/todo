import React from 'react';
import PropTypes from 'prop-types';
import { Task } from '../../../../common/Tasks';
import TaskLine from '../TaskLine/TaskLine';
import { TasksListProps } from "../../types/props";

export default function TasksList({tasks, updateTask, deleteTask}: TasksListProps) {
    const rows: JSX.Element[] = (tasks as Task[]).map(task => 
        <TaskLine 
            key={task.id} 
            task={task} 
            updateTask={updateTask}
            deleteTask={deleteTask}
        />);

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