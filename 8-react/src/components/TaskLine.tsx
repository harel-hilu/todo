import React, { ChangeEvent, useEffect, useState } from 'react';
import EditableLabel from './EditableLabel';
import {createUseStyles} from 'react-jss';
import PropTypes from 'prop-types';

export default function TaskLine({ task, updateTask, deleteTask }: any) {
    const [isEditing, setEditing] = useState<boolean>(false);
    const classes: Record<string, string> = useStyles();

    return (
        <div className={classes.task}>
            <input 
                className={classes.checkbox}
                type="checkbox" 
                checked={task.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateTask({isDone: e.target.checked, id: task.id, text: task.text})}
            />
            
            <EditableLabel 
                isEditing={isEditing}
                setEditing={setEditing}
                initialText={task.text} 
                saveText={(textToUpdate) => 
                    updateTask({text: textToUpdate, isDone: task.isDone, id: task.id})}
            />
 
            <button 
                className={classes.button} 
                onClick={() => setEditing(true)}> 
                Edit
            </button>

            <button 
                className={classes.button} 
                onClick={() => deleteTask(task)}> 
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
    task: {
        display: "flex",
        marginTop: "8px",
        borderBottomStyle: 'solid',
        borderBottomColor: '#3d3d3d',
        borderBottomWidth: '1px',
    }
});
