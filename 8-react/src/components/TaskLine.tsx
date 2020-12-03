import React, { ChangeEvent, useState } from 'react';
import { Task } from '../../../common/Tasks';
import EditableLabel from './EditableLabel';
import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';

export default function TaskLine({ taskToRender, updateTask, deleteTask }: any) {
    const [task, setTask] = useState<Task>(taskToRender);
    const classes: Record<string, string> = useStyles();
    
    function handleTaskChange({isDone=task.isDone, text=task.text}) {
        const taskToUpdate = {
            isDone: isDone,
            text: text,
            id: task.id
        };

        setTask(taskToUpdate);
        updateTask(taskToUpdate);
    }

    return (
        <div className={classes.task}>
            <input 
                className={classes.checkbox}
                type="checkbox" 
                checked={task.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                    handleTaskChange({isDone: e.target.checked})}
            />

            <EditableLabel 
                initialValue={task.text} 
                saveText={(newText: string) => handleTaskChange({text: newText})} 
            />
 
            <button 
                className={classes.button} 
                onClick={() => deleteTask(task)}> 
                Delete
            </button>
        </div>
    );
}

TaskLine.propTypes = {
    taskToRender: PropTypes.object,
    updateTask: PropTypes.func,
    deleteTask: PropTypes.func
}

const useStyles = createUseStyles({
    checkbox: {
        height: "18px",
        width: "18px",
    },
    button: {
        backgroundColor: "white",
        color: "red",
        border: "none",
    },
    task: {
        display: "flex",
        marginTop: "8px",
        borderBottomStyle: 'solid',
        borderBottomColor: '#3d3d3d',
        borderBottomWidth: '1px',
    }
});
