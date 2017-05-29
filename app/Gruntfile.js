
module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            default: {
                src: ['./www/js/index.js'],
                dest: 'www/js/libs/bundle.js'
            }
        },
mk
        run: {
            options: {
                // Task-specific options go here.
            },
            your_target: {
                cmd: 'cordova',
                args: [
                    'deploy',
                    'android'

                ]
            }
        }
    });

    // grunt.loadTasks('../../tasks');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-run');
    grunt.registerTask('default',['browserify','run']);

};