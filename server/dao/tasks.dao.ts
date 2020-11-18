import { RedisClient } from 'redis';
import { v4 } from 'uuid';
import { Task, TasksById } from "../../../todo/6-Typescript/src/intefaces/Tasks";

type stringifiedTasks = {[key: string]: string};

export const getAllTasks = 
    async (client: RedisClient, userId: string): Promise<TasksById> => {

    const stringifiedTasks: stringifiedTasks = 
        await promisify(client.hgetall, client, userId); 
        
    return parseResponse(stringifiedTasks);
};

export const createTask = 
    async (client: RedisClient, userId: string, task: Task): Promise<Task> => {

    task.id = task.id || v4();
    await promisify(client.hset, client, userId, task.id, JSON.stringify(task));

    return task;
}

export const deleteTask = 
    (client: RedisClient, userId: string, taskId: string) => {
        
    return promisify(client.hdel, client, userId, taskId);
}

function parseResponse(res: stringifiedTasks): TasksById {
    const parsedTasks: TasksById = {};

    for (const task in res) {
        parsedTasks[task] = JSON.parse(res[task])
    }

    return parsedTasks;
}

function promisify (funcToCall: Function, thisArg: any, ...args): Promise<any> {
    return new Promise((res, rej) => {
        funcToCall.call(thisArg, ...args, (err, redisRes) => err ? rej(err) : res(redisRes));
    });
}