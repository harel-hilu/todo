import { NewTask } from "../../../../common/Tasks";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

export default function AddNewTask({addTask}: any) {
    const [text, setText] = useState('');
    const classes = useStyles();

    const addNewTask = () => {    
        if (text === "") {
            return;
        }
        
        const taskToAdd: NewTask = {text: text, isDone: false};
        addTask(taskToAdd);
        setText('');
    }
    
    return (
        <div className={classes.container}>
            <input id="addTaskInput"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress={e => e.key === "Enter" && addNewTask()}
                autoFocus
                className={classes.taskInput}
            />
            <button id="addTaskButton"
                className={classes.addButton}
                onClick={addNewTask}
            >
                Add Task!
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