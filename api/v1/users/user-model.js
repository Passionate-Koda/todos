var mongoose = require('mongoose'),
		bcrypt	 = require('bcrypt-nodejs'),
		Schema 	 = mongoose.Schema,
		UserSchema;


mongoose.connect("mongodb://localhost/todos")

UserSchema = mongoose.Schema({//structure of the database
	username: {unique: true, required: true, type: String},
	password: {required:true, type:String},
	todos: [{type: Schema.Types.ObjectId, ref: "tasks"}], //this holds all tthe data that will be collected from this user

})

UserSchema.pre('save', function(next) { //before save...
	this.password = this.encryptPassword(this.password);
	next();
})


UserSchema.methods = {
	authenticate: function(plaintext) {
		return bcrypt.compareSync(plaintext, this.password);//compare the entered and the database
	},

	encryptPassword: function(plaintext) {
		if(!plaintext)
		return ""

		var salt = bcrypt.genSaltSync();// salt is an extra info to make it harder to generate a password
		return bcrypt.hashSync(plaintext, salt);
	}
}

module.exports = mongoose.model("users", UserSchema);
