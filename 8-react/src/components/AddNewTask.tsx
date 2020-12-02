import React, { ChangeEvent, useState } from 'react';
import {createUseStyles} from 'react-jss'

export default function AddNewTask(props: any) {
    const [text, setText] = useState('');
    const classes = useStyles();

    function handleTextChange(e: ChangeEvent<HTMLInputElement>){
        setText(e.target.value);
    }

    function handleAddTaskClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (text != '') {
            props.addTask(text);
            setText('');
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && text != '') {
            props.addTask(text);
            setText('');
        }
    };

    return (
        <div className={classes.container}>
            <input className={classes.taskInput}
                autoFocus 
                value={text} 
                onChange={handleTextChange} 
                onKeyDown={handleKeyDown} 
            />
            <button className={classes.addButton} onClick={handleAddTaskClick}>Add Task</button>
        </div>
    );  
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
        color: "black",
        alignSelf: "flex-end",
        marginRight: "5px",
        marginLeft: "auto",
        border: "none",
        backgroundColor: "red",
        borderRadius: "5px",
        height: 24,
    },
})