var wo = require("./models/wo");
var user = require("./models/user");


module.exports = [
  {
    //route to connect to your stylesheet
    method:'GET',
    path:'/{param*}',
    handler: {
      directory:{
        path: 'public'
      }
    }
  }, {
    //route home page
    method:'GET',
    path: '/',
    handler:function(req, reply){
      var userModel = new user();
      userModel.loadUsers(function(err, users){
        reply.view("static", {
          users: users
        });
      });

    }
  }, {
    //loads all jobs
    method: 'GET',
    path: '/wo',
    handler: function(req, reply){
      var model = new wo();
      model.loadAllJobs(function(err, jobs){
        reply.view("orders", {
          jobs: jobs
        });
      });
    }
  }, {
      //loads jobs for a specific user
    method: 'GET',
    path: '/wo/{name}',
    handler: require('./handlers/userJobs')
  }, {
      //loads Specific job that is clicked on by a user
    method: 'GET',
    path: '/wo/{name}/{job}',
    handler: require('./handlers/userJob')
  },{
    //route to a static page
    method:'GET',
    path: '/static',
    handler:function(req, reply){
      reply.view("static")
    }
  }
]
