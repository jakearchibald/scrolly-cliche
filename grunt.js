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
          'www/js/script.js'
        ],
        dest: 'www/js/all.js',
        separator: ';'
      }
    },
    watch: {
      files: '<config:min.dist.src>',
      tasks: 'lint concat'
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
        jQuery: true,
        $: true,
        cv: true
      }
    },
    uglify: {
      mangle: { toplevel: true },
      squeeze: {}
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat');
  grunt.registerTask('build', 'lint min');

};
