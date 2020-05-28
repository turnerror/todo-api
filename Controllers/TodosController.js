const DbService = require('../Services/DbService');
const TodosService = require('../Services/TodosService');

async function getTodos(req, res) {
    const completed = req.query.completed;

    if (!TodosService.validation.validateCompletedQuery(completed)) {
        return res.status(400).send('Bad Request');
    }

    const db = await DbService.connectToDB();
    const data = await TodosService.database.getTodos(db, completed);

    return res.json({success: data.length > 0, data: data});
}

async function postTodos(req, res) {
    const body = req.body;

    if (!body.task) {
        return res.status(400).send('Bad Request');
    }

    const db = await DbService.connectToDB();
    const query = await TodosService.database.addTodo(db, body.task);

    return res.json({success: query.insertedCount === 1});
}

async function putTodos(req, res) {
    const body = req.body;

    if (!TodosService.validation.validateIds(body.ids)) {
        return res.status(400).send('Bad Request');
    }

    const obj_ids = TodosService.utilities.idsToObjectIds(body.ids);
    const db = await DbService.connectToDB();
    const query = await TodosService.database.completeTodos(db, obj_ids);

    return res.json({success: query.result.n > 0});
}

async function deleteTodos(req, res) {
    const body = req.body;

    if (!TodosService.validation.validateIds(body.ids)) {
        return res.status(400).send('Bad Request');
    }

    const obj_ids = TodosService.utilities.idsToObjectIds(body.ids);
    const db = await DbService.connectToDB();
    const query = await TodosService.database.deleteTodos(db, obj_ids);

    return res.json({success: query.result.n > 0});
}


module.exports.getTodos = getTodos;
module.exports.postTodos = postTodos;
module.exports.putTodos = putTodos;
module.exports.deleteTodos = deleteTodos;
