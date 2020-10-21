const express = require('express');

const app = express();
const port = 3000;

const sendInTheMiddle =  function(req, res, next) {
    console.log("middle");
    req.x = "Hello world!";
    next();
}

app.use(express.static('media'));
app.use(sendInTheMiddle);
app.get('/wow',  (req, res) => {
    console.log(req.x);
    res.send("req.x.toString()");
});

app.listen(port, () => console.log(`listening on port ${port}`));