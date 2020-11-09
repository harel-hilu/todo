import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 } from 'uuid';

const app = express();
app.set('views', '../5-Heroku');

const port = (process.env.PORT || 5000);
const userIdCookieName = "todoUserId";
const users = {};

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(validateUser);

app.get('/', (req, res) => {
    res.render("index.ejs", {title: "My todo list"});
});

app.get('/api/v1/tasks',  (req, res) =>  {    
    res.status(200).send(users[req.userId]);
});

app.post('/api/v1/tasks',  (req, res) => {
    const taskToAdd = req.body;
    const userTasks = users[req.userId];

    if (taskToAdd.id === -1) {
        taskToAdd.id = v4();
    }

    userTasks[taskToAdd.id] = taskToAdd;
    res.status(200).send(taskToAdd);
});

app.delete('/api/v1/tasks/:taskId', (req, res) => {
    const userTasks = users[req.userId];
    delete userTasks[req.params.taskId];
    res.status(200).send();
});

function validateUser(req, res, next) {
    req.userId = req.cookies[userIdCookieName];
    
    if (req.userId === undefined) {
        req.userId = v4();
        res.cookie(userIdCookieName, req.userId);
        users[req.userId] = {};
        next();
    } else if (req.userId in users) {
        next();
    } else {
        res.status(401).send("You cannot access this page. Delete cookies");
    }
}

app.listen(port, () => console.log(`listening on port ${port}`));