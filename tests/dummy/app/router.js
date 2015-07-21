import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('text-input');
  this.route('number-input');
  this.route('password-input');
  this.route('phone-input');
  this.route('email-input');
  this.route('number-array-input');

  this.route('input-wrapper');
  this.route('form-wrapper');

  // HELPERS / INLINE
  this.route('input-addon');
  this.route('demo-button-addon');
  this.route('input-feedback');
  this.route('input-screen-reader');

  // SHARED
  this.route('shared-style');
  this.route('shared-color');
  this.route('shared-size');
  this.route('shared-masks');
  this.route('shared-width-height');
  this.route('shared-rules');
  this.route('shared-status');
  this.route('shared-animation');
  this.route('shared-sound');
  this.route('shared-vibration');
  this.route('shared-events');
  this.route('shared-textAlign');

  // OTHER
  this.route('configuration');
  this.route('dependencies');

});
