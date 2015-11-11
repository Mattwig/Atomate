//load modules
var hapi = require('hapi');
var wo = require("./models/wo");
var db = require('./db');

//create server and select port
var server = new hapi.Server();

server.connection({
  host:process.env.HOST || "localhost",
  port:process.env.PORT || 8000
});

//Run database function and start the server via the callback. This allows time for the database to either be created or opened before the server is booted up and queries can be executed
db(function(err){
  server.start(function(){
    console.log("Running server at " + server.info.uri);
  });
});

//register the vision plugin and require it in order to set up the views
//sets how views are rendered, uses handlebars as the templating engine and sets the path to the html page layouts
server.register(require('vision'), function (err){
  server.views({
    engines: {
      html:require('handlebars')
    },
    path: 'templates',
    layoutPath:'layouts',
    layout:"dashboard",
    helpersPath:"helpers",
    partialsPath:'templates/partials',
    isCached:false
  });
})

//Register inert plug in so we are able to link to files like our style sheet
server.register({
    register: require('inert'),
    options: {
        message: 'hello'
    }
 }, function (err) {

     if (err) {
         console.log('Failed loading plugin');
     }
 });

//Here are your routes, they allow you to reroute traffic via the url path
//I will leave three examples in addition to the home page so you have an idea how it works
server.route(require('./routes'));
