const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const TodosService = require('../Services/TodosService');
const Client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});

async function getTodos(req, res) {
    const completed = req.query.completed;
    if (completed && completed !== '1') {
        return res.status(400).send('Bad Request');
    }
    await Client.connect();
    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let data = await collection.find({completed: {$exists: completed === '1'}, deleted: {$exists: false}}).toArray();

    res.json({success: data.length > 0, data: data});
}

async function postTodos(req, res) {
    let body = req.body;
    if (!body.task) {
        return res.status(400).send('Bad Request');
    }

    await Client.connect();

    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let query = await collection.insertOne({task: body.task});

    res.json({success: query.insertedCount === 1});
}

async function putTodos(req, res) {
    const body = req.body;
    if (!TodosService.validateIds(body.ids)) {
        return res.status(400).send('Bad Request');
    }

    const obj_ids = body.ids.map(id => ObjectId(id));
    await Client.connect();

    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let query = await collection.updateMany({_id: {$in: obj_ids}}, {$set: {completed: 1}});

    return res.json({success: query.result.n > 0});
}

async function deleteTodos(req, res) {
    const body = req.body;
    if (!TodosService.validateIds(body.ids)) {
        return res.status(400).send('Bad Request');
    }

    const obj_ids = body.ids.map(id => ObjectId(id));
    await Client.connect();

    let db = Client.db('Todo');
    let collection = db.collection('Todos');
    let query = await collection.updateMany({_id: {$in: obj_ids}}, {$set: {deleted: 1}});

    return res.json({success: query.result.n > 0});
}


module.exports.getTodos = getTodos;
module.exports.postTodos = postTodos;
module.exports.putTodos = putTodos;
module.exports.deleteTodos = deleteTodos;