var wo = require("../models/wo");
var user = require("../models/user");

module.exports = function(req, reply){
  var userModel = new user();
  var woModel = new wo();
 userModel.loadUser(req.params.name, function(err, user){
   userModel.loadUsers(function(err, users){
    woModel.loadJob(req.params.job, function(err, job){
      reply.view("timer", {
        users: users,
        name: user.name,
        title: user.title,
        jobName: job.name,
        dueDate: job.dueDate ,
        step: job.step
        });
      });
    })
  });
}
