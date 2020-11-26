import { RedisClient } from 'redis';
import { v4 } from 'uuid';
import { Task, TasksById } from "../../common/Tasks";
import "../extensions/function.extension";

type stringifiedTasks = {[key: string]: string};

export const getAllTasks = 
    async (client: RedisClient, userId: string): Promise<TasksById> => {

    const stringifiedTasks: stringifiedTasks = 
        await client.hgetall.promisify(client, userId);
        
    return parseResponse(stringifiedTasks);
};

export const createTask = 
    async (client: RedisClient, userId: string, task: Task): Promise<Task> => {

    task.id = task.id || v4();
    await client.hset.promisify(client, userId, task.id, JSON.stringify(task));

    return task;
}

export const deleteTask = 
    (client: RedisClient, userId: string, taskId: string) => {

    return client.hdel.promisify(client, userId, taskId);
}

function parseResponse(res: stringifiedTasks): TasksById {
    const parsedTasks: TasksById = {};

    for (const task in res) {
        parsedTasks[task] = JSON.parse(res[task])
    }

    return parsedTasks;
}