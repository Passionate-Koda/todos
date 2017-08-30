var server = require('./server/server.js'),
	PORT   = 8888;

// start listening
server.listen(PORT, function () {
	console.log("server started on port: " + PORT);
})