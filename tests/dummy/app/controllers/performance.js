import Ember from 'ember';

export default Ember.Controller.extend({
  perfTest: null,
  actions: {
    changeTest(hash) {
      if (hash.value) {
        this.transitionToRoute(`performance.${hash.value}`);
      }
    }
  }
});
