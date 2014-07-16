module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        react: {
            combined_file_output: {
                files: {
                    'public/js/commentbox.js': [
                        'src/client/react/tutorial3.jsx',
                        'src/client/react/tutorial2.jsx',
                        'src/client/react/tutorial1.jsx'
                    ]
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-react');

    // Default task(s).
    grunt.registerTask('default', [ 'react' ]);
    grunt.registerTask('build', [ 'react' ]);
};
