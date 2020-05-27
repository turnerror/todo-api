const express = require('express');
const bodyParser = require('body-parser');
const TodosController = require('./modules/todosController');

const app = express();
const port = 3000;

var jsonParser = bodyParser.json();

app.get('/todos', TodosController.getTodos);

app.post('/todos', jsonParser, TodosController.postTodos);

app.put('/todos', jsonParser, TodosController.putTodos);

app.delete('/todos', jsonParser, TodosController.deleteTodos);

app.listen(port);
