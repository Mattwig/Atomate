var wo = require("../models/wo");
var user = require("../models/user");

/*
Load all the jobs a user can perform based on the title they have
*/
module.exports = function(req, reply){
  var userModel = new user();
  var woModel = new wo();

  //Load user name and title
  userModel.loadUser(req.params.name, function(err, User){

    //load steps the user can perform on jobs based on title
    userModel.loadStep(User.title, function(err, Step){

      //load jobs user can work on based on title
      woModel.loadJobs(Step.step, function(err, jobs){

        reply.view("orders", {
          name: User.name,
          title: User.title,
          jobs: jobs
        });
      });
    });
  })
}
