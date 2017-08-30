var auth = require('./auth.js');


exports.signIn = function(req, res, next){
  console.log(req.user);
  var user = req.user.toObject();
  var token = auth.sign(user._id);
  user["_token"] = token




  res.status(200).json(user);
}
