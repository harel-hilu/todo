import { Task } from "../../../../common/Tasks";
import { TaskLineProps } from "../../types/props";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {createUseStyles} from 'react-jss';

export default function TaskLine({task, updateTask, deleteTask}: TaskLineProps) {
    const [isEditing, setEditing] = useState(false);
    const [isDone, setDone] = useState(task.isDone);
    const [text, setText] = useState(task.text)
    const classes = useStyles();

    useEffect(() => {
        if (task.text === text && task.isDone === isDone) {
            return;
        }

        updateTask({
            id: task.id,
            text: text,
            isDone: isDone
        });
    }, [isEditing, isDone]);

    return (
        <div className={classes.task} data-hook="task">
            <input 
                checked={isDone}
                onChange={(e) => setDone(e.target.checked)}
                type="checkbox"
                data-hook="taskCheckbox"
                className={classes.checkbox}
            />

            {(!isEditing) ?
                <label 
                    onClick={() => setEditing(true)}
                    className={classes.label} 
                    data-hook="taskLabel"
                >
                    {text}
                </label>
                :
                <input
                    value={text}
                    onBlur={() => setEditing(false)}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                    data-hook="taskInput"
                    className={classes.label}
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