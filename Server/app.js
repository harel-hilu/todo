const express = require('express');
const uuid = require('uuid');
const cookieParser = require('cookie-parser')

const app = express();
app.set('views', '../5-Heroku');

const port = (process.env.PORT || 3000);
const users = {
    1: {},
};
const userIdCookieName = "todoUserId";

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    const userId = req.cookies[userIdCookieName];

    if (userId === undefined) {
        createNewUser(res);
    }
    
    res.render("index.ejs", {title: "title from server"})
});

app.get('/api/v1/tasks',  (req, res) =>  {
    const userId = req.cookies[userIdCookieName];
    
    if (!validateUser(userId)) {
        res.status(401).send();
    } else {
        res.status(200).send(users[userId]);
    }
});

app.post('/api/v1/tasks',  (req, res) => {
    const userId = req.cookies[userIdCookieName];
    
    if (!validateUser(userId)) {
        res.status(401).send();
    } else {
        const taskToAdd = req.body;
        const userTasks = users[userId];
    
        if (taskToAdd.id === -1) {
            taskToAdd.id = uuid.v4();
        }

        userTasks[taskToAdd.id] = taskToAdd;
        res.status(200).send(taskToAdd);
    }
});

app.delete('/api/v1/tasks/:taskId', (req, res) => {
    const userId = req.cookies[userIdCookieName];

    if (!validateUser(userId)) {
        res.status(401).send();
    } else {
        const userTasks = users[userId];
        delete userTasks[req.params.taskId];
        res.status(200).send();
    }
});

function validateUser(userId) {
    return userId in users;
}

function createNewUser(res) {
    const userId = uuid.v4();
    res.cookie(userIdCookieName, userId);
    users[userId] = {};
}

app.listen(port, () => console.log(`listening on port ${port}`));