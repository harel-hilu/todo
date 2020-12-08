import React, { useState } from 'react';

export default function AddNewTask() {
    const [text, setText] = useState('');
    
    return (
        <>
            <input 
                value={text}
                onChange={e => setText(e.target.value)}
                autoFocus
            />
            <button
                onClick={() => setText('')}
            >
                Add Task!
            </button>
        </>
    );
}