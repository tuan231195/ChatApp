module.exports = function (grunt) {

    grunt.initConfig({
            env: {
                test: {
                    NODE_ENV: 'test'
                },
                dev: {
                    NODE_ENV: 'development'
                },
                prod: {
                    NODE_ENV: 'production'
                }
            },
            // ===================================
            //  JSHINT
            // ===================================
            jshint: {
                all: {
                    src: ["app.js", 'public/src/*.js', "server/**/*.js"]
                }
            },
            // ===================================
            //  CSSLINT
            // ===================================
            csslint: {
                all: {
                    src: ["./public/style/*.css"]
                }
            },

            // ===================================
            //  WATCH
            // ===================================
            watch: {
                server_js: {
                    files: ['app.js', 'server/**/*.js'],
                    tasks: ['jshint']
                },
                client_js: {
                    files: ['public/src/**/*.js'],
                    tasks: ['jshint', 'browserify:dev']
                },
                css: {
                    files: 'public/style/*.css',
                    tasks: ['csslint']
                }
            },


            // ===================================
            // BROWSERIFY
            // ===================================
            browserify: {
                dev: {
                    options: {
                        browserifyOptions: {
                            debug: true
                        },
                        transform: [["babelify", {"presets": ["es2015"]}]]
                    },
                    src: [
                        "./public/src/app.js"
                    ],
                    dest: './public/scripts/app.js'
                },
                release: {
                    options: {
                        browserifyOptions: {
                            debug: true
                        },
                        transform: [["babelify", {"presets": ["es2015"]}]],
                        plugin: [
                            ["minifyify", {map: false}]
                        ]
                    },
                    src: [
                        "./public/src/app.js"
                    ],
                    dest: './public/scripts/app.js'
                }
            },
            // ===================================
            // CONCURRENT
            // ===================================
            concurrent: {
                dev: {
                    tasks: ['nodemon', 'watch'],
                    options: {
                        logConcurrentOutput: true
                    }
                }
            }
            ,
            // ===================================
            // NODEMON
            // ===================================
            nodemon: {
                dev: {
                    script: 'app.js',
                    options: {
                        ext: 'js,html',
                        watch: ['app.js', 'server/**/*.js']
                    }
                }
            }
        }
    )
    ;


// Load plugins
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');


    grunt.registerTask('default', ['env:dev', 'lint', 'browserify:dev', 'concurrent']);
    grunt.registerTask('release', ['env:prod', 'browserify:release']);
    grunt.registerTask('lint', ['jshint', 'csslint']);
}
;