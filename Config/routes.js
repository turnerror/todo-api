const bodyParser = require('body-parser');
const TodosController = require('../Controllers/TodosController');

var jsonParser = bodyParser.json();

function routes(app) {
    app.get('/todos', TodosController.getTodos);

    app.post('/todos', jsonParser, TodosController.postTodos);

    app.put('/todos', jsonParser, TodosController.putTodos);

    app.delete('/todos', jsonParser, TodosController.deleteTodos);
}

module.exports = routes;