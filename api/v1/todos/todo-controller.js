var todoModel = require('./todo-model.js'),
		userModel = require("../users/user-model.js");

exports.intercept = function(req, res, next, id) {
	todoModel.findById(id, function(err, todo) {
		if(err) {
			req.errstatus = 404;
			return next(new Error("Invalid ID. cannot find todo"));
		}

		req.todo = todo
		next();
	})
}

exports.addTodo = function(req, res, next) {
	// prepare a new todo model with incoming req
	var todo = new todoModel(req.body);
	todo['owner'] = req.user._id;

	todo.save(function(err, todo) {
		if(err) {
			req.errstatus = 500;
			return next(err);
		}

		//find the user that owns the todo
		// we will push the todo iunto the users todo array
		userModel.update(req.user._id, {$push:{todos:todo}}, function(err, user){
			if(err){
				req.errstatus = 404;
				return next(err);
			}
		})

		res.status(200).json(todo);
	})
}

exports.fetchAllTodos = function(req, res, next) {
	/*todoModel.find(function(err, todos) {
	if(err) {
	req.errstatus = 500;
	return next(err);
}

res.status(200).json(todos);
})*/
console.log(req.user);
userModel.findOne({_id: req.user._id})
.populate('todos')
.exec(function(err, todos){
	if(err){
		req.errstatus = 404
		return next(new Error("could not find users with todos"))
	}
	res.status(200).json(todos);
})
}

exports.fetchTodo = function(req, res, next) {
	var id = req.params.id
	res.status(200).json(req.todo);
}


exports.updateTodo = function(req, res, next){
	var newTodo = req.body
	todoModel.update({_id: req.todo['_id']}, newTodo, (err, todo)=>{
		if(err){
			req.errstatus = 500
			return next(new Error("could not update at this time"))
		}
		res.status(200).json(todo)
	})
}


exports.deleteTodo = function(req, res, next){
	var id = req.params.id;
	todoModel.remove({'_id':id}, (err, todo)=>{
		if(err){
			req.errstatus = 500
			return next(new Error("could not delete"))
		}
		res.status(200).json(todo);

	})
}
