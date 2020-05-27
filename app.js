const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 3000;

var jsonParser = bodyParser.json();

const Client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/todos', async (req, res) => {
    let completed = req.query.completed;
    await Client.connect();
    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let result = await collection.find({"completed": completed, "deleted": 0}).toArray();
    console.log(result);
    res.json({success: true, data: result});
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
