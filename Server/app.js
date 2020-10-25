const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
let todo = {};
let i = 0;

app.use(cors());
app.use(bodyParser.json());

app.get('/get',  (req, res) =>  res.send(todo));
app.post('/save',  (req, res) => todo = req.body);

app.listen(port, () => console.log(`listening on port ${port}`));