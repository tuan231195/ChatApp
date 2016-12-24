// Karma configuration
// Generated on Thu Dec 22 2016 09:18:10 GMT+1100 (AEDT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './public/scripts/app.js',
            './public/templates/**/*.html',
            './test/components/login.specs.js',
            './test/components/signup.specs.js',
            './test/components/route.specs.js',
            './test/components/authservice.specs.js',
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'public/templates/**/*.html': ['ng-html2js']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,

        plugins: [
            // include the plugin
            'karma-jasmine', 'karma-ng-html2js-preprocessor', 'karma-chrome-launcher'
        ],


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        ngHtml2JsPreprocessor: {
            // strip this prefix from the file path (template cache uses urls as object keys, we need this to match the original url used in the directive)
            stripPrefix: 'public/'
        },

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
