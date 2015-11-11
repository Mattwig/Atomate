var sqlite3 = require('sqlite3');

//Passes a function that requires a callback. Use callback to start up server after db has either been created or opened
module.exports = function(callback){

  var db = new sqlite3.Database('database.db', function(err){
    //create tables if they do not exist
    db.run("CREATE TABLE IF NOT EXISTS jobs (name, dueDate, step INTEGER, woNumber INTEGER);", function(err){
      db.run("CREATE TABLE IF NOT EXISTS users (userID INTEGER, name, titleID);", function(){
        db.run("CREATE TABLE IF NOT EXISTS steps (name, woNumber, step INTEGER, time INTEGER)", function(){
          db.run("CREATE TABLE IF NOT EXISTS title (titleID INTEGER, step INTEGER, title, rate)")
        });
      });
    });
  });

  db.close(callback)
};
