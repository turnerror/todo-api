const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/', (req, res) => res.send('Welcome to my todo app'));

app.get('/todo', (req, res) => {
    let deleted = req.query.deleted;

    res.send('Delete = 1 or 0')
});

app.post('/todo', jsonParser, (req, res) => {
    //code to create todo here
    let body = req.body;// how we access our body information after the parser.
    res.send('created a todo!');
});

app.put('/todo/:id', jsonParser, (req, res) => {
    //code to mark todo done here
    let body = req.body;// how we access our body information after the parser.
    res.send('created a todo!');
});

app.delete('/todo/:id', jsonParser, (req, res) => {
    //some code to delete todo here
    let body = req.body;// how we access our body information after the parser.
    res.send('created a todo!');
});


app.listen(port);
