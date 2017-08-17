var request = require('supertest'),
    chai    = require('chai'),
    app     = require('./server.js'),
    assert  = chai.assert,
    expect  = chai.expect,
    should  = chai.should();

describe("#todo", function(){
  it("should insert a todo item", function(done){
    var todo = {
      task: "do some testing",
      date: "23rd Aug, 2017",
      time: "2pm"
    }

    request(app)
    .post('/api/v1/todos')
    .send(todo)
    .end(function(err, res){
      expect(res.body).to.be.an("Object");
      assert(res.body.time, "5pm")

      done();
    })
  })


  it.skip("should return all todos");
})
