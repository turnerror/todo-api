const ObjectId = require('mongodb').ObjectId;

function addTodo(db, newTask) {
    let collection = db.collection('Todos');
    return collection.insertOne({"task" : newTask});
}

function getTodos(db, completed) {
    let collection = db.collection('Todos');
    return collection.find({completed: {$exists: completed === '1'}, deleted: {$exists: false}}).toArray();
}

function completeTodo(db, id) {
    let collection = db.collection('Todos');
    return collection.updateOne({_id: ObjectId(id)}, {$set: {completed: 1}});
}

function deleteTodo(db, id) {
    let collection = db.collection('Todos');
    return collection.updateOne({_id: ObjectId(id)}, {$set: {deleted: 1}});
}

module.exports.addTodo = addTodo;
module.exports.getTodos = getTodos;
module.exports.completeTodo = completeTodo;
module.exports.deleteTodo = deleteTodo;
