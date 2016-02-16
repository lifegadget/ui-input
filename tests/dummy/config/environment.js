/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    UiInput: {
      iconFamily: 'fa'
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': " http://cloudfront.net",
      'script-src': "'self' 'unsafe-inline'",
      'font-src': "'self' http://fonts.gstatic.com http://fonts.googleapis.com",
      'connect-src': "'self'",
      'img-src': "'self'",
      'style-src': "'self' http://fonts.googleapis.com",
      'media-src': "'self'"
    }
  };

  if (environment === 'development') {
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
