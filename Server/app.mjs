import express from 'express';
import path from 'path';
import url from 'url';

const app = express();
const port = (process.env.PORT || 3000);
const appPath = url.fileURLToPath(import.meta.url);
const serverPath = path.dirname(appPath);
const tasks = {};

app.use(express.static(serverPath + "/public"));
app.use(express.json());

app.get('/api/v1/tasks',  (req, res) =>  {
    res.status(200).send(tasks);
});

app.put('/api/v1/tasks/:taskId',  (req, res) => {
    const taskToAdd = req.body;
    const isNewTask = req.params.taskId in tasks;
    tasks[taskToAdd.id] = taskToAdd;
    isNewTask ? res.status(201).send("Task created") :
                res.status(200).send("Task updated");
});

app.delete('/api/v1/tasks/:taskId', (req, res) => {
    delete tasks[req.params.taskId];
    res.status(200).send("task deleted");
});

app.listen(port, () => console.log(`listening on port ${port}`));