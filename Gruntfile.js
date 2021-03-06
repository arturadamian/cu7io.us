module.exports = function (grunt) {

  grunt.initConfig({

    // remove unused styles
    uncss: {
      dist: {
        options: {
          ignore: ['#footer-sticky.footer-closed']
        },
        files: {
          'dist/build.css': ['index.html'],
        }
      }
    },

    // concat & min css
    cssmin: {
      options: {
        // sourceMap: true
      },
      dist: {
        files: {
          'dist/build.min.css': [
            'dist/build.css'
          ]
        }
      }
    },

    // concat & minify js
    uglify: {
      options: {
        screwIE8: true
      },
      my_target: {
        files: {
          'dist/build.min.js': [
            'assets/js/preloader.js',
            'assets/js/progressbar.js',
            'assets/js/main.js'
          ]
        }
      }
    },

    // clear project & move builded files to the right place
    exec: {
      rm_dc_store: {
        command: "find . -name '*.DS_Store' -type f -delete"
      },
      rm_js_sources: {
        command: "rm -f ./assets/js/*.js"
      },
      rm_css_sources: {
        command: "rm -f ./assets/css/*.css"
      },
      rm_dev_junk: {
        command: "rm -f .gitignore && rm -f dev-servr.sh && rm -f package.json && rm -f README.MD  && rm -f yarn.lock && rm -f Gruntfile.js &&"
      },
      mv_dist_files: {
        command: "mv dist/build.min.css assets/css/ && mv dist/build.min.js assets/js/ && rm -rf dist"
      }
    },

    // replace links to files inside .html document
    'string-replace': {
      dist: {
        files: {
          './': 'index.html'
        },
        options: {
          replacements: [{
            pattern: '<link rel="stylesheet" href="./assets/css/style.css" type="text/css" media="all">',
            replacement: '<link rel="stylesheet" href="./assets/css/build.min.css" type="text/css" media="all">'
          }, {
            pattern: '<link rel="stylesheet" href="./assets/css/gumby.css" type="text/css" media="screen">',
            replacement: ""
          }, {
            pattern: '<link rel="stylesheet" href="./assets/css/media-queries.css" type="text/css" media="screen">',
            replacement: ""
          }, {
            pattern: '<!-- <link rel="stylesheet" href="./assets/css/elementTransitions.css" type="text/css" media="screen"> -->',
            replacement: ""
          }, {
            pattern: '<!-- <link rel="stylesheet" href="./assets/css/baseline-checker.css" type="text/css" media="screen"> -->',
            replacement: ""
          }, {
            pattern: "<!-- Load scripts -->",
            replacement: "<!-- Load js -->"
          }, {
            pattern: '<script type="text/javascript" src="./assets/js/preloader.js"></script>',
            replacement: '<script type="text/javascript" src="./assets/js/build.min.js"></script>'
          }, {
            pattern: '<script type="text/javascript" src="./assets/js/progressbar.js"></script>',
            replacement: ""
          }, {
            pattern: '<script type="text/javascript" src="./assets/js/main.js"></script>',
            replacement: ""
          }]
        }
      }
    }

  });

  // Load plugins that provides tasks.
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-string-replace');

  // Default task(s).
  grunt.registerTask('default', ['uncss', 'cssmin', 'uglify', 'exec', 'string-replace']);

};
