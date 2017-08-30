var express = require('express'),
	bps		= require('body-parser'),
	morgan	= require('morgan'),
	cors = require('cors'),
	api     = require('../api/api.js');



// initialize express
var app = express();

// load application level middlewares
app.use(morgan('dev'));
app.use(bps.urlencoded({extended: false}))
app.use(bps.json());
app.use(cors());

// mount all routes/endpoints here
app.use('/api/v1', api);

// setup application error handler
app.use(function (err, req, res, next) {
	res.status(req.errstatus).json(err.message);
})

// export the application object
module.exports = app;
