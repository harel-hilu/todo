import { v4 } from 'uuid';

export const getAllTasks = (client, userId) => {
    return new Promise((res,rej) => client.hgetall(userId, (err, redisResponse) => 
        err ? rej(err) : res(parseResponse(redisResponse))));
};

export const createTask = (client, userId, task) => {
    task.id = task.id || v4();

    return new Promise((res, rej) => client.hset(userId, task.id, JSON.stringify(task), 
        (err, redisResponse) => err ? rej(err) : res(task)));
}

export const deleteTask = (client, userId, taskId) => {
    return new Promise((res, rej) => client.hdel(userId, taskId,
        (err, redisResponse) => err ? rej(err) : res()));
}

function parseResponse(res) {
    return Object.values(res).map(task => JSON.parse(task));
}