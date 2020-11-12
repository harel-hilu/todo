import axios from "axios";

export const saveTaskToServer = async (task) => {
    const response = await axios.post('/api/v1/tasks', task);
    return response.data;
}

export const getAllTasksFromServer = async () => {
    const response = await axios.get('/api/v1/tasks');
    return response.data;
}

export const deleteTaskFromServer = async (taskId) => {
    return await axios.delete('/api/v1/tasks/' + taskId);
}