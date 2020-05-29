const ObjectId = require('mongodb').ObjectId;

function addTodo(db, newTask) {
    let collection = db.collection('Todos');
    return collection.insertOne({"task" : newTask});
}

function getTodos(db, completed) {
    let collection = db.collection('Todos');
    return collection.find({completed: {$exists: completed === '1'}, deleted: {$exists: false}}).toArray();
}

function getTodo(db, id) {
    let collection = db.collection('Todos');
    return collection.findOne({_id: ObjectId(id)});
}

function completeTodo(db, id) {
    let collection = db.collection('Todos');
    return collection.updateOne({_id: ObjectId(id)}, {$set: {completed: 1}});
}

function editTodo(db, todo) {
    let collection = db.collection('Todos');
    return collection.updateOne({_id: ObjectId(todo._id)},{$set: {task: todo.task}});
}

function deleteTodo(db, id) {
    let collection = db.collection('Todos');
    return collection.updateOne({_id: ObjectId(id)}, {$set: {deleted: 1}});
}

module.exports.addTodo = addTodo;
module.exports.getTodos = getTodos;
module.exports.getTodo = getTodo;
module.exports.completeTodo = completeTodo;
module.exports.editTodo = editTodo;
module.exports.deleteTodo = deleteTodo;
