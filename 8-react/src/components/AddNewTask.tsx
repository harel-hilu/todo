import React, { ChangeEvent, useState } from 'react';

export default function AddNewTask(props: any) {
    const [text, setText] = useState('')

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
        <div>
            <input 
                autoFocus 
                value={text} 
                onChange={handleTextChange} 
                onKeyDown={handleKeyDown} 
            />
            <button onClick={handleAddTaskClick}>Add Task</button>
        </div>
    );
}