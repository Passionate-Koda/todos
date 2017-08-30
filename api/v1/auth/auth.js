var expressjwt = require("express-jwt"),
	jwt 	   = require("jsonwebtoken"),
	userModel = require("../users/user-model.js");
	checkToken = expressjwt({secret: "jsonweb"});


	exports.decodeToken = function(req, res, next) {
		req.errstatus = 501
		checkToken(req, res, next)
	}

exports.verifyUsers = function(req, res, next) {
	var username = req.body.username,
			password = req.body.password;

			if(!username || !password){
				req.errstatus = 501
				return next (new Error("please provide login details"))
			}

			userModel.findOne({username: username})
			.then(function(user){
				//validate the password
				if(!user.authenticate(password)){
					req.errstatus= 501
					return next(new Error("either username or password is incorrect"))
				}

				req.user = user;//give user if correct
				next();
			}),//then instead of callback
			function(err){//negative promise
				req.errstatus = 500
				return next(err);
			}





}



exports.sign = function(id) {
	return jwt.sign(
		{_id: id}, //id is needed for it is unique to users
		"jsonweb",
		{expiresIn: 14 * 24 * 60 * 60}
	)
}
