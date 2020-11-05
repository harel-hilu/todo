import axios from "axios";
import { toCssValue } from "jss";

export const saveTaskToServer = async (task) => {
    return await axios.post('/api/v1/tasks', task);
}

export const getAllTasksFromServer = async () => {
    return await axios.get('/api/v1/tasks');
}

export const deleteTaskFromServer = async (taskId) => {
    return await axios.delete('/api/v1/tasks/' + taskId);
}