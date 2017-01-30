module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'assets/javascript/main.min.js': ['assets/javascript/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};