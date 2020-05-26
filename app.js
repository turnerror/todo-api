const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/user/:id', (req, res) => {
    let name = req.query.name;
    let id = req.params.id;

    res.send('Hello ' + id + '!')
});

app.post('/user', jsonParser, (req, res) => {
    //some code here
    let body = req.body;// how we access our body information after the parser.
    res.send('created a user!');
});


app.listen(port);
