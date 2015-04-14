import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['animation','sound','error','warn'],
  
  animation: 'none',
  _animation: Ember.computed('animation', function() {
    let animation = this.get('animation');
    if(animation === 'none') {
      return null;
    }
    return animation;
  }),
  sound: 'none',
  _sound: Ember.computed('sound', function() {
    let sound = this.get('sound');
    if(sound === 'none') {
      return null;
    }
    return sound;
  }),  
  maxLength: 10,
  lengthParamsJson: Ember.computed('error','warn', function() {
    let { warn, error }  = this.getProperties('warn','error');
    return `{"warning": ${warn}, "error": ${error} }`;
  }),
  error: 5,
  warn: 3,
  warnAt: Ember.computed('maxLength','warnBefore', function() {
    return this.get('maxLength') - this.get('warnBefore');
  })

  
});