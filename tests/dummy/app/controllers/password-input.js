import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['size','width','textAlign','rules','length','showPassword'],

  size: 'huge',
  width: '50%',
  textAlign: 'center',
  showPassword: false,
  rules: 'none',
  _rules: Ember.on('init', Ember.computed('rules', function() {
    let rules = this.get('rules');
    if(rules === 'none' || rules === ['none']) {
      return null;
    } else {
      return rules;
    }
  }))

});