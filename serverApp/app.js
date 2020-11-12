import express from 'express';
import cookieParser from 'cookie-parser';
import redis from 'redis';
import { validateUser } from "./services/auth.middleware";
import { deleteTask, createTask, getAllTasks } from "./dao/tasks.dao";

const client = redis.createClient(process.env.REDIS_URL);

const app = express();
app.set('views', './');
const port = (process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(validateUser);

app.get('/', (req, res) => {
    res.render("index.ejs", {title: "Todo List"});
});

app.get('/api/v1/tasks',  async (req, res) =>  { 
    const tasks = await getAllTasks(client, req.userId);
    res.status(200).send(tasks);
});

app.post('/api/v1/tasks',  async (req, res) => {
    const task = await createTask(client, req.userId, req.body);
    res.status(200).send(task);
});

app.delete('/api/v1/tasks/:taskId', async (req, res) => {
    await deleteTask(client, req.userId, req.params.taskId);
    res.status(200).send();    
});

app.listen(port, () => console.log(`listening on port ${port}`));