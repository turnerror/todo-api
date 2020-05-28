function addTodo(db, newTask) {
    let collection = db.collection('Todos');
    return collection.insertOne({"task" : newTask});
}

function getTodos(db, completed) {
    let collection = db.collection('Todos');
    return collection.find({completed: {$exists: completed === '1'}, deleted: {$exists: false}}).toArray();
}

function completeTodos(db, obj_ids) {
    let collection = db.collection('Todos');
    return collection.updateMany({_id: {$in: obj_ids}}, {$set: {completed: 1}});
}

function deleteTodos(db, obj_ids) {
    let collection = db.collection('Todos');
    return collection.updateMany({_id: {$in: obj_ids}}, {$set: {deleted: 1}});
}

module.exports.addTodo = addTodo;
module.exports.getTodos = getTodos;
module.exports.completeTodos = completeTodos;
module.exports.deleteTodos = deleteTodos;