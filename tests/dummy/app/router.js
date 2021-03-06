import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('demo-text-input');
  this.route('demo-numeric-input');
  this.route('demo-password-input');
  this.route('demo-email-input');
  this.route('performance', function() {
    this.route('native');
    this.route('component');
    this.route('helper');
  });
  this.route('demo-other-inputs');
});

export default Router;
