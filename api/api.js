var express = require('express'),
	api		= express.Router(),
	todoRoute = require('./v1/todos/todo-router.js'),
	userRoute = require('./v1/users/user-router.js'),
	authRoute = require('./v1/auth/auth-router.js');

// mount routes
api.use('/todos', todoRoute);
api.use('/users', userRoute);
api.use('/auth', authRoute);

module.exports = api
