import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 } from 'uuid';
import redis from 'redis';

const client = redis.createClient(process.env.REDIS_URL);
const app = express();
app.set('views', './');
const port = (process.env.PORT || 5000);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(validateUser);

function validateUser(req, res, next) {
    const userIdCookieName = "todoUserId";
    const userKeyPrefix = "user:";
    req.userId = req.cookies[userIdCookieName];
    
    if (req.userId === undefined) {
        req.userId = v4();
        client.set(userKeyPrefix + req.userId, "");
        res.cookie(userIdCookieName, req.userId);
        next();
    } else {
        client.exists(userKeyPrefix + req.userId, (err, redisResponse) =>
            (redisResponse === 1) ? 
            next() : 
            res.status(401).send("You cannot access this page. Delete cookies"));
    }
}

app.get('/', (req, res) => {
    res.render("index.ejs", {title: "Todo List"});
});

app.get('/api/v1/tasks',  (req, res) =>  {   
    client.hgetall(req.userId, (err, redisResponse) => {
        (redisResponse === undefined) ?
        res.status(200).send({}) :
        res.status(200).send(redisResponse);
    });
});

app.post('/api/v1/tasks',  (req, res) => {
    const task = req.body;
    
    if (task.id === -1) {
        task.id = v4();
    }

    client.hset(req.userId, task.id, JSON.stringify(task));
    res.status(200).send(task);
});

app.delete('/api/v1/tasks/:taskId', (req, res) => {
    client.hdel(req.userId, req.params.taskId, 
        (err, redisResponse) => res.status(200).send());    
});

app.listen(port, () => console.log(`listening on port ${port}`));