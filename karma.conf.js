module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/es5-shim/es5-shim.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
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
