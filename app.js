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
    let result = await collection.find({completed: {$exists: completed === '1'}, deleted: {$exists: false}}).toArray();

    res.json({success: true, data: result});
});

app.post('/todos', jsonParser, async (req, res) => {
    let body = req.body;
    await Client.connect();

    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let result = await collection.insertOne({task: body.task});

    res.json({success: true});
});

app.put('/todos', jsonParser, async (req, res) => {
    const body = req.body;
    const obj_ids = body.ids.map(id => ObjectId(id));
    await Client.connect();

    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let result = await collection.updateMany({_id: { $in: obj_ids }}, {$set: {completed: 1}});

    res.json({success: true});
});

app.delete('/todos', jsonParser, async (req, res) => {
    const body = req.body;
    const obj_ids = body.ids.map(id => ObjectId(id));
    await Client.connect();

    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let result = await collection.updateMany({_id: { $in: obj_ids }}, {$set: {deleted: 1}});

    res.json({success: true});
});

app.listen(port);
