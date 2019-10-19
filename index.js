const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let port = process.env.PORT || 3030;
let key = process.env.key
let moduleId = process.env.moduleId

app.use(bodyParser.json());

function sendErr(res, json, status) {
    res.json(json);
}

function authenticate(req, res, next) {
    if (req.body.key === key) {
      next();
    } else {
      sendErr(res, { error: "Incorrect authentication key." }, 401);
    }
}

app.get('/', (req, res) => {
    res.send(`Server online.`);
    res.status(200);
});

app.get('/module', authenticate, (req, res) => {
    res.send(moduleId);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});