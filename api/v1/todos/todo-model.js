var mongoose = require('mongoose'),
todoSchema,
Schema = mongoose.Schema;


// connect to mongoose db
mongoose.connect("mongodb://localhost/todos")

todoSchema = new mongoose.Schema({
	task: {type: String, required: true},
	date: {type: String, required: true},
	time: {type: String, required: true},
	owner: {type: Schema.Types.ObjectId, ref: "users"}
})

module.exports = mongoose.model("tasks", todoSchema);
