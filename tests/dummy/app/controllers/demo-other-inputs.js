import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    emailWarn(value, options) {
      console.log('WARNGING', value, options);
    }
  }
});
