// Load required modules
var backbone = require('backbone');
var Datetime = require('node-datetime');
var sqlite3 = require('sqlite3');

// initalize database
var db = new sqlite3.Database('database.db');

module.exports = backbone.Model.extend({
  defaults:{
    time: 0
  },
  //insert the current job into the database as a step
  PostTime: function(callback){
    var self = this;
    var post = db.prepare("INSERT INTO steps VALUES ($name, $woNumber, $step, $time)");
    post.run(callback);
  }




})
