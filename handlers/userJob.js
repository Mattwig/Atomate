var wo = require("../models/wo");
var user = require("../models/user");

module.exports = function(req, reply){
  var userModel = new user();
  var woModel = new wo();
  userModel.loadJobs(req.params.name, function(err, User){
    woModel.loadJob(req.params.job, function(err, job){
      console.log(job)
      reply.view("timer", {
        name: job.name,
        dueDate: job.dueDate ,
        step: job.step
      });
    });
  })
}
