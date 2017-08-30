var express = require('express'),
  authRouter = express.Router(),
  auth      = require('./auth.js'),
  authController = require('./auth-controller.js');


  authRouter.route('/signin')
  .post(auth.verifyUsers, authController.signIn)

  module.exports = authRouter
