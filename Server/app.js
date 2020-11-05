const express = require('express');
const uuid = require('uuid');

const app = express();
app.set('views', '../5-Heroku');

const port = (process.env.PORT || 3000);
const tasks = {};

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.get('/', (req, res) => {
    res.render("index.ejs", {x: 5})
});

app.get('/api/v1/tasks',  (req, res) =>  {
    res.send(tasks);
});

app.post('/api/v1/tasks',  (req, res) => {
    const taskToAdd = req.body;

    if (taskToAdd.id === -1) {
        taskToAdd.id = uuid.v4();
    }

    tasks[taskToAdd.id] = taskToAdd;
    res.status(200).send(taskToAdd);
});

app.delete('/api/v1/tasks/:taskId', (req, res) => {
    delete tasks[req.params.taskId];
    res.status(200).send();
});

app.listen(port, () => console.log(`listening on port ${port}`));