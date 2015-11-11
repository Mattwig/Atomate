//Load required modules
var backbone = require('backbone');
var Datetime = require('node-datetime');
var sqlite3 = require('sqlite3');

//create date and set to tomorrow with a mask of mm/dd/yy
var dt = Datetime.create();
dt.offsetInDays(1);
var dueDate = dt.format('m/d/y');
var db = new sqlite3.Database('database.db');


module.exports = backbone.Model.extend({
  defaults:{
    name: "New Job",
    dueDate:dueDate,
    step:"prep"
  },

  loadAllJobs: function(callback){
    var self = this;
    var loadAll = db.prepare('SELECT * FROM jobs');
    loadAll.all(callback);
  },


  loadJobs: function(step, callback){
    var self = this;
    var loadAll = db.prepare('SELECT * FROM jobs WHERE step <= $step', {
      $step: step
    });
    loadAll.all(callback);
  },

//loads a specific job based on the work order number
  loadJob: function(name, callback){
    var self = this;
    var loadAll = db.prepare('SELECT * FROM jobs WHERE name = $name', {
      $name: name
    });
    loadAll.get(callback);
  },
})
