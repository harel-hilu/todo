import axios from "axios";

export const saveTaskToServer = async (task) => {
    return await axios.post('/api/v1/tasks', task);
}

export const getAllTasksFromServer = async () => {
    const response = await axios.get('/api/v1/tasks');
    let tasks = response.data;

    for (const key in tasks) {
        tasks[key] = JSON.parse(tasks[key]);
    }

    return tasks;
}

export const deleteTaskFromServer = async (taskId) => {
    return await axios.delete('/api/v1/tasks/' + taskId);
}