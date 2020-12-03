import React, { ChangeEvent, useState } from 'react';
import {createUseStyles} from 'react-jss'
import PropTypes from 'prop-types';

export default function AddNewTask({addTask}: any) {
    const [text, setText] = useState<string>('');
    const classes: Record<string, string> = useStyles();

    function addTaskIfNotEmpty(): void {
        if (text !== '') {
            addTask(text);
            setText('');
        }
    }

    return (
        <div className={classes.container}>
            <input className={classes.taskInput}
                autoFocus 
                value={text} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => 
                    (e.key === "Enter" && addTaskIfNotEmpty())} 
            />
            <button className={classes.addButton} onClick={addTaskIfNotEmpty}>
                Add Task
            </button>
        </div>
    );  
}

AddNewTask.propTypes = {
    addTask: PropTypes.func
}

const useStyles = createUseStyles({
    container: {
        display: "flex",
        marginBottom: "20px",
    },
    taskInput: {
        flexGrow: 1,
        maxWidth: "400px",
        borderRadius: "5px",
        paddingLeft: "5px",
    },
    addButton: {
        color: "white",
        alignSelf: "flex-end",
        marginRight: "5px",
        marginLeft: "auto",
        border: "none",
        backgroundColor: "black",
        borderRadius: "5px",
        height: 24,
    },
})