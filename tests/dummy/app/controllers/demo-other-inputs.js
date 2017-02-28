import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),

  actions: {
    emailWarn(status) {
      const ev = status.emailValidator;
      const flash = this.get('flashMessages');
      console.log(status);
      if(ev.code === 'cleared-warning') {
        flash.success(`The warning code "${ev.clearedCode}" has been cleared and is now ok.`);
      } else {
        flash.warning(`The email address has entered the "${ev.state}" state with an error code of "${ev.code}"`);
      }
    }
  }
});
