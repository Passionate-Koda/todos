var userModel = require('./user-model.js'),
auth	  = require('../auth/auth.js');

exports.addUser = function(req, res, next) {

	var userdata = req.body;

	var newUser = new userModel(userdata);
	newUser.save(function(err, user) {
		if(err) {
			req.errstatus = 500
			return next(err)
		}

		// make user a true object
		user = user.toObject();
		var token = auth.sign(user._id);
		user["_token"] = token
		user["success"] = true;

		res.status(200).json(user);
	})
}
