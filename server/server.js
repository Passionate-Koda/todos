var express = require('express'),
    morgan  = require('morgan'),
    bps     = require('body-parser'),

    api     = require('../api/api.js');


    var app = express();

    app.use(morgan('dev'));
    app.use(bps.urlencoded({extended:false}));
    app.use(bps.json());

//mount all route
app.use('/api/v1', api)


    app.use(function (err, req, res, next){
      res.send (req.errstatus).json(err.message);
    });

    module.exports = app;
