const ObjectId = require('mongodb').ObjectId;

function validateIds(ids) {
    const regex = /[0-9a-f]{24}/;
    let check = true;

    ids.forEach(id => {
        if (!(regex.test(id))) {
            check = false;
            return false;
        }
    });

    return check;
}

function idsToObjectIds(ids){
    return ids.map(id => ObjectId(id));
}

async function addTodo(db, newTask) {
    let collection = db.collection('Todos');
    return collection.insertOne({"task" : newTask});
}

async function getTodos(db, completed) {
    let collection = db.collection('Todos');
    return collection.find({completed: {$exists: completed === '1'}, deleted: {$exists: false}}).toArray();
}

async function completeTodos(db, obj_ids) {
    let collection = db.collection('Todos');
    return collection.updateMany({_id: {$in: obj_ids}}, {$set: {completed: 1}});
}

async function deleteTodos(db, obj_ids) {
    let collection = db.collection('Todos');
    return collection.updateMany({_id: {$in: obj_ids}}, {$set: {deleted: 1}});
}

module.exports.validateIds = validateIds;
module.exports.idsToObjectIds = idsToObjectIds;
module.exports.addTodo = addTodo;
module.exports.getTodos = getTodos;
module.exports.completeTodos = completeTodos;
module.exports.deleteTodos = deleteTodos;
