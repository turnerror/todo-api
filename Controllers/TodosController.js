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

    return res.json({success: query.insertedCount === 1, data: query.ops[0]});
}

async function putTodo(req, res) {
    const id = req.params.id;

    if (!TodosService.validation.validateId(id)) {
        return res.status(400).send('Bad Request');
    }

    const db = await DbService.connectToDB();
    const query = await TodosService.database.completeTodo(db, id);

    return res.json({success: query.result.n > 0});
}

async function deleteTodo(req, res) {
    const id = req.params.id;

    if (!TodosService.validation.validateId(id)) {
        return res.status(400).send('Bad Request');
    }

    const db = await DbService.connectToDB();
    const query = await TodosService.database.deleteTodo(db, id);

    return res.json({success: query.result.n > 0});
}


module.exports.getTodos = getTodos;
module.exports.postTodos = postTodos;
module.exports.putTodo = putTodo;
module.exports.deleteTodo = deleteTodo;
