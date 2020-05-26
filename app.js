const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.get('/todos', (req, res) => {
    let completed = req.query.completed; //1 or 0

    res.send('Get all todos')
});

app.post('/todos', jsonParser, (req, res) => {
    //code to create todo here
    let body = req.body;
    res.send('created a todo!');
});

app.put('/todos', jsonParser, (req, res) => {
    //some code to mark all selected todos as complete
    let body = req.body;
    res.send('updated selected todos!');
});

app.delete('/todos', jsonParser, (req, res) => {
    //some code to delete all selected todos here
    let body = req.body;
    res.send('deleted selected todos!');
});

app.listen(port);
