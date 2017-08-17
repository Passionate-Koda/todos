var mongoose = require('mongoose'),
    todoSchema;


    //connect
    mongoose.connect("mongodb://192.168.33.58/todos");

    todoSchema = new mongoose.Schema({
      task: {type: String, required: true},
      date: {type: String, required: true},
      time: {type: String, required: true}
    })

    module.exports = mongoose.model("tasks", todoSchema);
