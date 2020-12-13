import { Task } from "../../../../common/Tasks";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {createUseStyles} from 'react-jss';

export default function TaskLine({task, updateTask, deleteTask}: any) {
    const [isEditing, setEditing] = useState(false);
    const [isDone, setDone] = useState(task.isDone as boolean);
    const [text, setText] = useState(task.text as string)
    const classes = useStyles();

    const handleEditTextFinish = (e: React.FocusEvent<HTMLInputElement>) => {
        if (text !== task.text) {
            const taskToUpdate: Task = {id: task.id, isDone: task.isDone, text: text};
            updateTask(taskToUpdate);
        }
        setEditing(false);
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDone(isDone => !isDone);
        const taskToUpdate: Task = {id: task.id, isDone: e.target.checked, text: text};
        updateTask(taskToUpdate);
    }

    return (
        <div className={classes.task} data-hook="task">
            <input 
                data-hook="taskCheckbox"
                className={classes.checkbox}
                checked={isDone}
                type="checkbox"
                onChange={handleCheckboxChange}
            />

            {(!isEditing) ?
                <label 
                    className={classes.label} 
                    onClick={() => setEditing(true)}
                    data-hook="taskLabel"
                >
                    {text}
                </label>
                :
                <input
                    className={classes.label}
                    value={text}
                    onBlur={handleEditTextFinish}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                    data-hook="taskInput"
                />
            }
            
            <button 
                onClick={() => setEditing(true)} 
                className={classes.button}
                data-hook="taskEditButton"
            >
                Edit
            </button>
            <button 
                onClick={() => deleteTask(task)} 
                className={classes.button}
                data-hook="taskDeleteButton"
            >
                Delete
            </button>
        </div>
    );
}

TaskLine.propTypes = {
    task: PropTypes.object,
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
    label: {
        display: "flex",
        flexGrow: 1,
        fontSize: "20px"
    },
    task: {
        display: "flex",
        marginTop: "8px",
        borderBottomStyle: 'solid',
        borderBottomColor: '#3d3d3d',
        borderBottomWidth: '1px',
    }
});