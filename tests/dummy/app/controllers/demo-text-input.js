import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const {computed, observer, $, A, run, on, typeOf, debug, defineProperty, get, set, inject, isEmpty} = Ember;  // jshint ignore:line

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {
    changed: function(context) {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.success('Input changed to: ' + get(context, 'value'));
    },
    action: function(evtType) {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.info(`User action: ${evtType}`);
    },
    error: function(code) {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.warning(`Rule constraint: ${code}`);
    }
  }
});
