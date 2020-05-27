const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const BodyValidation = require('./modules/validation');

const app = express();
const port = 3000;

var jsonParser = bodyParser.json();

const Client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/todos', async (req, res) => {
    const completed = req.query.completed;
    if (completed && completed !== '1'){
        return res.status(400).send('Bad Request');
    }
    await Client.connect();
    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let data = await collection.find({completed: completed}, {deleted: {$exists: false}}).toArray();

    res.json({success: data.length > 0, data: data});
});

app.post('/todos', jsonParser, async (req, res) => {
    let body = req.body;
    if (!body.task){
        return res.status(400).send('Bad Request');
    }

    await Client.connect();

    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let query = await collection.insertOne({task: body.task});

    res.json({success: query.insertedCount === 1 });
});

app.put('/todos', jsonParser, async (req, res) => {
    const body = req.body;
    const validation = new BodyValidation();
    if (!validation.validateIds(body.ids)){
        return res.status(400).send('Bad Request');
    }

    const obj_ids = body.ids.map(id => ObjectId(id));
    await Client.connect();

    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let query = await collection.updateMany({_id: { $in: obj_ids }}, {$set: {completed: 1}});

    return res.json({success: query.result.n > 0});
});

app.delete('/todos', jsonParser, async (req, res) => {
    const body = req.body;
    const validation = new BodyValidation();
    if (!validation.validateIds(body.ids)){
        return res.status(400).send('Bad Request');
    }

    const obj_ids = body.ids.map(id => ObjectId(id));
    await Client.connect();

    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let query = await collection.updateMany({_id: { $in: obj_ids }}, {$set: {deleted: 1}});

    return res.json({success: query.result.n > 0});
});

app.listen(port);
