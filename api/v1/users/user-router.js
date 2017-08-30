var express 		= require('express'),
	userRouter   	= express.Router(),
	userController  = require('./user-controller.js');

userRouter.route('/')
	.post(userController.addUser);

module.exports = userRouter;