// Karma configuration
// Generated on Fri Dec 05 2014 15:48:45 GMT+0100 (W. Europe Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],


    // list of files / patterns to load in the browser
    files: [
		'Senken/Scripts/jquery-2.1.1.min.js',
		'Senken/Scripts/jquery-2.1.1.js',
		'Senken/Scripts/app/senkenBiquadFilter.js', 
		'Senken/Scripts/app/senkenCompressor.js',
		'Senken/Scripts/app/senkenMasterController.js',
		'Senken/Scripts/app/senkenVisualAnalyser.js',
		'Senken/Scripts/app/senkenWaveBucket.js',
		'Senken/Scripts/app/senkenOscillator.js',
		'Senken/Scripts/app/senkenSynth.js',
		'Senken/Scripts/*.js',
		'Senken/Scripts/app/*.js',
		'Senken/Scripts/tests/*.js'
    ],


    // list of files to exclude
    exclude: [
		'Senken/Scripts/_references.js',
		'Senken/Scripts/*.intellisense.js',
		'Senken/Scripts/qunit.js',
		'Senken/Scripts/app/hub.js'
		
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
	   'Senken/Scripts/app/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'junit', 'coverage'],

	junitReporter: {
		outputFile: 'test_results/karma/test-results.xml',
    },
	coverageReporter: {
		reporters:[
			{
				type: 'html',
				dir:'coverage/',
				subdir: function(browser) {
					// normalization process to keep a consistent browser name accross different
					// OS
					return browser.toLowerCase().split(/[ /-]/)[0];
				}
			},
			{
				type: 'cobertura',
				dir:'coverage/',
				subdir: function(browser) {
					// normalization process to keep a consistent browser name accross different
					// OS
					return browser.toLowerCase().split(/[ /-]/)[0];
				}
			},


		]
	},

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
