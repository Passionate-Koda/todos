var todoModel = require('./todomodel.js');

exports.intercept = function(req, res, next, id){
  todoModel.findById(id,function(err, todo){
    if(err){
      req.errstatus = 404;
      return next(new Error("Invalid id. cannot find todo"));
    }
    req.todo = todo
    next();
  })
}

exports.addTodo = function(req, res, next){
  //prepare a new model with incoming req
  var todo = new todoModel(req.body);

  todo.save(function(err, todo){
    if(err){
      req.errstatus = 500;
      return next(err);
    }
    res.status(200).json(todo);
  })
}


exports.fetchAllTodos = function(req, res, next) {
  todoModel.find(function(err, todos){
    if(err){
      req.errstatus = 500;
      return next(err);
    }
    res.status(200).json(todos);
  })
}

exports.fetchTodo = function(req, res, next){
  var id = req.params.id
res.status(200).json(req.todo);
}
