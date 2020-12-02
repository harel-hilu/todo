import React, { ChangeEvent, useState } from 'react';
import { Task, NewTask } from '../../../common/Tasks';
import EditableLabel from './EditableLabel';

export default function TaskLine(props: any) {
    const [task, setTask] = useState<Task>(props.task);

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
        <div>
            <input 
                type="checkbox" 
                checked={task.isDone}
                onChange={handleCheckboxChange}
            />
            <EditableLabel saveText={handleTextChange}>
                {task.text}
            </EditableLabel>
            <button onClick={() => props.deleteTask(task)}>Delete</button>
        </div>
    );
}