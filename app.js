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
    let body = req.body;
    res.send('created a todo!');
});

app.put('/todo', jsonParser, (req, res) => {
    //some code to mark all selected todos as complete
    let body = req.body;
    res.send('deleted select todos!');
});

app.delete('/todo', jsonParser, (req, res) => {
    //some code to delete all selected todos here
    let body = req.body;
    res.send('deleted select todos!');
});


app.listen(port);
