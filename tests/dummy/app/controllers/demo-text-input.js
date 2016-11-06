import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line


export default Ember.Controller.extend({
  flashMessages: service(),
  actions: {
    buttonPressed(hash) {
      console.log(hash);
    },
    submitDetected(context) {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.success('Submit was detected for input: ' + get(context, 'evt.target').id);
    },
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
    },
    onSubmit(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);
    }
  }
});
