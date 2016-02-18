import Ember from 'ember';

export default Ember.Controller.extend({

  isRepressed: false,
  toggledEnablement: false,
  isIndexPage: Ember.computed.equal('currentPath', 'index'),
  notIndexPage: Ember.computed.not('isIndexPage'),

  actions: {
    navChange(context) {
      const {routeTo, linkTo} = context[0];
      if(linkTo) {
        window.open(linkTo);
      }
      if (routeTo) {
        this.transitionToRoute(routeTo);
      }
    }
  }

});
