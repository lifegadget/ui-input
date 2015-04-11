import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['style'],
  style: 'bootstrap',
  myAnimation: null,

  quotedMyAnimation: Ember.computed('myAnimation', function() {
    let animation = this.get('myAnimation');
    if (animation === true ) {
      return 'true';
    }
    return animation ? `'${animation}'` : null;
  }),
  
  actions: {
    animateMe: function(animationType) {
      console.info('animating using: %s', animationType);
      this.set('myAnimation', animationType);
    }
  }

});