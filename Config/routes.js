const bodyParser = require('body-parser');
const TodosController = require('../Controllers/TodosController');

var jsonParser = bodyParser.json();

function routes(app) {
    app.get('/todos', TodosController.getTodos);

    app.post('/todos', jsonParser, TodosController.postTodos);

    app.put('/todo/:id', jsonParser, TodosController.putTodo);

    app.delete('/todo/:id', jsonParser, TodosController.deleteTodo);
}

module.exports = routes;