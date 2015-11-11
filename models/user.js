//load required modules
var backbone = require('backbone');
var sqlite3 = require('sqlite3');

//sets up database
var db = new sqlite3.Database('database.db');

module.exports = backbone.Model.extend({
  defaults:{
    userID:"",
    name: "John Johnson",
    title: "QA Analyst",
    step:""
  },

//load a specific user and returns a function that contains the results in an object
  loadUser: function(user, callback){
    var self = this;
    var loadUser = db.prepare('SELECT * FROM users WHERE name = $name', {
      $name: user
    });
    loadUser.get(callback);
  },

//loads all users and returns a function that contains the results in an object
  loadUsers: function(callback){
    var self = this;
    var loadUsers = db.prepare('SELECT * FROM users');
    loadUsers.all(callback);
  },

//Load steps allowed for a job based on title of the user
  loadStep: function(title, callback){
    var self = this;
    var loadStep = db.prepare('SELECT step FROM title WHERE title = $title', {
      $title: title
    })
    loadStep.get(callback);
  }
})
