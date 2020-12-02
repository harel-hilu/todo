import React, { ChangeEvent, useState } from 'react';
import { Task, NewTask } from '../../../common/Tasks';
import EditableLabel from './EditableLabel';
import {createUseStyles} from 'react-jss'

export default function TaskLine(props: any) {
    const [task, setTask] = useState<Task>(props.task);
    const classes = useStyles();
    function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        const taskToUpdate = {
            isDone: e.target.checked,
            text: task.text,
            id: task.id
        };

        setTask(taskToUpdate);
        props.updateTask(taskToUpdate);
    }
    
    function handleTextChange(text: string) {
        const taskToUpdate = {
            isDone: task.isDone,
            text: text,
            id: task.id
        };

        setTask(taskToUpdate);
        props.updateTask(taskToUpdate);
    }

    return (
        <div className={classes.task}>
            <input 
                className={classes.checkbox}
                type="checkbox" 
                checked={task.isDone}
                onChange={handleCheckboxChange}
            />
            <EditableLabel saveText={handleTextChange}>
                {task.text}
            </EditableLabel>
            <button className={classes.button} onClick={() => props.deleteTask(task)}>Delete</button>
        </div>
    );
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
