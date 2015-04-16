import Ember from 'ember';

export default Ember.Controller.extend({

  size: 'huge',
  width: '50%',
  textAlign: 'center',
  rules: null,
  _rules: Ember.on('init', Ember.computed('rules', function() {
    let rules = this.get('rules');
    if(rules === 'none' || rules === ['none']) {
      return null;
    } else {
      return rules;
    }
  }))

});