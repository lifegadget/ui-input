import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [
    'size','width','height','min','max',
    'animateRuleMinMax','animateRuleMinMaxStretch', 'animateRuleStepUpDown',
    'color', 'textAlign', 'textColor','backgroundColor','borderColor','outlineColor'
  ],

  size: 'huge',
  width: '50%',
  height: null,
  min: 0,
  max: 10,
  color: 'default',
  textAlign: 'center',
  pattern: '[0-9]*',
  textColor: null,
  backgroundColor: null,
  borderColor: null,
  outlineColor: null,
  animateRuleMinMax: 'tada',
  animateRuleMinMaxStretch: 'rubberBand',
  animateRuleStepUpDown: 'bounce'
});