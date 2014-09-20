// Generated on 2013-07-16 using generator-angular 0.3.0
'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Configurable paths
    var config = {
        app: 'src',
        dist: 'dist'
    };


    grunt.initConfig({

        config: config,
        pkg: grunt.file.readJSON('package.json'),

        // Cleaning the release directory
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            }
        },

        // Put files not handled in minification in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.js'
                    ]
                }]
            }
        },
        // Minification uglify
        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/angular-inheritance.min.js': [
                        '<%= config.dist %>/angular-inheritance.js'
                    ]
                },
                options: {
                    mangle:false
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'uglify'
    ]);

};
