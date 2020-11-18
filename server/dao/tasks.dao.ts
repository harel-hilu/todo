import { Redis } from 'ioredis';
import { v4 } from 'uuid';
import { Task, TasksHashMap } from "../../../todo/6-Typescript/src/intefaces/Tasks";

export const getAllTasks = (client, userId: string): Promise<TasksHashMap> => {
    return new Promise((res,rej) => client.hgetall(userId, (err, redisResponse) => 
        err ? rej(err) : res(parseResponse(redisResponse))));
};

export const createTask = (client, userId: string, task: Task): Promise<Task> => {
    task.id = task.id || v4();

    return new Promise((res, rej) => client.hset(userId, task.id, JSON.stringify(task), 
        (err, redisResponse) => err ? rej(err) : res(task)));
}

export const deleteTask = (client, userId: string, taskId: string) => {
    return new Promise((res, rej) => client.hdel(userId, taskId,
        (err, redisResponse) => err ? rej(err) : res()));
}

function parseResponse(res: [string, string]): TasksHashMap {
    const parsedTasks: TasksHashMap = {};
    for (const task in res) {
        parsedTasks[task] = JSON.parse(res[task])
    }

    return parsedTasks;
}