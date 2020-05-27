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

function validateCompletedQuery(completed) {
    let check = true;
    if (completed && completed !== '1'){
        check = false;
    }

    return check;
}

function idsToObjectIds(ids){
    return ids.map(id => ObjectId(id));
}

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

module.exports.validateIds = validateIds;
module.exports.validateCompletedQuery = validateCompletedQuery;
module.exports.idsToObjectIds = idsToObjectIds;
module.exports.addTodo = addTodo;
module.exports.getTodos = getTodos;
module.exports.completeTodos = completeTodos;
module.exports.deleteTodos = deleteTodos;