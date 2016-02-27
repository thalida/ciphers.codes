module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/app.js',
      'app/ciphers/*.js',
      'app/ciphers/types/**/*.js',
      'app/components/**/*.js',
      'app/views/**/*.js'
    ],

    autoWatch : true,

    color: true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],
    // browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
