import Ember from 'ember';
const { inject: {service} } = Ember; 
const { get } = Ember; 


export default Ember.Controller.extend({
  flashMessages: service(),
  actions: {
    buttonPressed(value, hash) {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.info(`Button pressed in the "${hash.location}" location. The value was ${value}.`);
    },
    submitDetected(value, context) {
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
