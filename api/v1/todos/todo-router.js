var express 		= require('express'),
	todoRouter      = express.Router(),
	todoController  = require('./todo-controller.js'),
	auth = require('../auth/auth.js');

todoRouter.param("id", todoController.intercept)

todoRouter.route('/')
	.post(auth.decodeToken, todoController.addTodo)
	.get(auth.decodeToken, todoController.fetchAllTodos)

todoRouter.route('/:id')
	.get(todoController.fetchTodo)
	.put(todoController.updateTodo)
	.delete(todoController.deleteTodo)



module.exports = todoRouter;
