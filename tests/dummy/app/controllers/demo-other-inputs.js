import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),

  actions: {
    emailWarn(status) {
      const { state, code } = status.emailValidator;
      this.get('flashMessages').warning(`The email address has entered the "${state}" state with an error code of "${code}"`);
    }
  }
});
