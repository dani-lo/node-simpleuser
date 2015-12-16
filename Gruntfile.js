module.exports = function(grunt) {

    grunt.initConfig({
      "mocha-server": {
        test: {
            src: 'test/spec.js',
            options: {
                ui: 'tdd',
                growl: true,
                reporter: 'nyan',
            },
        }
      },
    });

    grunt.loadNpmTasks('grunt-server-mocha');

    grunt.registerTask('utest', ['mocha-server:test']);
}