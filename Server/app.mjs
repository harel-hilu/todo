import express from 'express';
import path from 'path';
import url from 'url';

const app = express();
const port = 3000;
const appPath = url.fileURLToPath(import.meta.url);
const serverPath = path.dirname(appPath);
const tasks = {};

app.use(express.static(serverPath + "/public"));
app.use(express.json());

app.get('/api/v1/tasks',  (req, res) =>  {
    res.status(200).send(tasks);
});

app.post('/api/v1/tasks/:taskId',  (req, res) => {
    throw 42;
    const taskToAdd = req.body;
    tasks[taskToAdd.id] = taskToAdd;
    res.status(201).send("task added");
});

app.delete('/api/v1/tasks/:taskId', (req, res) => {
    delete tasks[req.params.taskId];
    res.status(200).send("task deleted");
});

app.listen(port, () => console.log(`listening on port ${port}`));