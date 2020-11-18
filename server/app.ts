import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import redis from 'redis';
import { validateUser } from "./services/auth.middleware";
import { deleteTask, createTask, getAllTasks } from "./dao/tasks.dao";
import { Task, TasksById } from "../../todo/6-Typescript/src/intefaces/Tasks";

const client: redis.RedisClient = redis.createClient(process.env.REDIS_URL);

const app: Express = express();
app.set('views', './');
const port: string = (process.env.PORT || "3000");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(validateUser);

app.get('/', (req: Request, res: Response): void => {
    res.render("index.ejs", {title: "Todo List"});
});

app.get('/api/v1/tasks',  async (req: Request, res: Response) =>  { 
    const tasks: TasksById = await getAllTasks(client, req.userId);
    res.send(tasks);
});

app.post('/api/v1/tasks',  async (req: Request, res: Response) => {
    const task: Task = await createTask(client, req.userId, req.body);
    res.send(task);
});

app.delete('/api/v1/tasks/:taskId', async (req: Request, res: Response) => {
    await deleteTask(client, req.userId, req.params.taskId);
    res.send();    
});

app.listen(port, () => console.log(`listening on port ${port}`));