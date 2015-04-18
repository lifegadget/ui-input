import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [
    'size','width','height','min','max',
    'animateRuleMinMax','animateRuleMinMaxStretch', 'animateRuleStepUpDown',
    'color', 'textAlign', 'textColor','backgroundColor','borderColor','outlineColor'
  ],
  
  _rules: null,
  rules: Ember.on('init',Ember.computed('rules', function(){
    let rules = this.get('_rules');
    if (!rules || rules === 'none') {
      return null;
    } else {
      return rules;
    }
  })),
  size: 'huge',
  width: '50%',
  height: null,
  min: 0,
  max: 10,
  color: 'default',
  textAlign: 'center',
  textColor: null,
  backgroundColor: null,
  borderColor: null,
  outlineColor: null,
  animateRuleMinMax: 'tada',
  animateRuleMinMaxStretch: 'rubberBand',
  animateRuleStepUpDown: 'bounce',
  
  hasInvalidDomainRule: Ember.on('init',Ember.computed('rules', function() {
    return !this.EmberArray(this.get('rules')).contains('invalidDomain');
  })),
  EmberArray: (value) => {
    if(Ember.typeOf(value) === 'array') {
      return Ember.A(value);
    } else if (!value || value === 'none') {
      return Ember.A([]);
    } else {
      return Ember.A([value]);
    }
  }
});