module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-contrib-less")
  grunt.loadNpmTasks("grunt-nodemon");


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent:{
      dev: {
        tasks: ["less","nodemon", "watch"],
        options:{
          logConcurrentOutput:true
        }
      }
    },
    nodemon:{
      dev:{
        script:'server.js'
      }
    },
    watch:{
      options:{
        livereload:true
      },
      html:{
        files:"**/*.html"
      },
      js:{
        files:"**/*.js"
      },
      less:{
        files:"**/*.less",
        tasks:["less"]
      }
    },
    less:{
      production:{
        options:{
          paths:["assets/css"]
        },
        files:{
          "public/css/style.css":"style.less"
        }
      }
    }
  });
  grunt.registerTask("default", ["concurrent"]);
};
