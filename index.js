var server = require('./server/server.js'),
    PORT    = 8888;


server.listen(PORT, function(){
  console.log("server started on port"+ PORT);
})
