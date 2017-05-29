
module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            default: {
                src: ['./views/js/main.js'],
                dest: 'views/js/libs/bundle.js'
            }
        },

        run: {
            options: {
                // Task-specific options go here.
            },
            your_target: {
                cmd: 'node',
                args: [
                    'server.js'

                ]
            }
        }
    });

    // grunt.loadTasks('../../tasks');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-run');
    grunt.registerTask('default',['browserify','run']);

};