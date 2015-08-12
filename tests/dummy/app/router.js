import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('demo-text-input');
  this.route('demo-number-input');
  this.route('demo-password-input');
  this.route('phone-input');
  this.route('email-input');
  this.route('number-array-input');

  this.route('demo-input-wrapper');
  this.route('form-wrapper');

  // HELPERS / INLINE
  this.route('demo-input-addon');
  this.route('demo-button-addon');
  this.route('input-feedback');
  this.route('input-screen-reader');

  // SHARED
  this.route('shared-rules');
  this.route('shared-animation');
  this.route('shared-sound');
  this.route('shared-vibration');
  this.route('shared-events');

  // OTHER
  this.route('configuration');
  this.route('dependencies');

});
