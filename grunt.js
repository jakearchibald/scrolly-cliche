/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      files: [
        '<config:min.dist.src>'
      ]
    },
    concat: '<config:min>',
    min: {
      dist: {
        src: [
          'www/js/applyAlpha.js',
          'www/js/parallaxify.js',
          'www/js/touchScroll.js',
          'www/js/main.js'
        ],
        dest: 'www/js/all.js',
        separator: ';\n'
      }
    },
    watch: {
      files: '<config:min.dist.src>',
      tasks: 'concat'
    },
    jshint: {
      options: {
        curly: true,
        immed: true,
        indent: 4,
        latedef: true,
        newcap: true,
        noarg: true,
        undef: true,
        boss: true,
        browser: true,
        unused: true,
        devel: true
      },
      globals: {
      }
    },
    uglify: {
      mangle: { toplevel: true },
      squeeze: {}
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat lint');
  grunt.registerTask('build', 'lint min');

};
