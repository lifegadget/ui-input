import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [
    'size','width','height','min','max',
    'animateRuleMinMax','animateRuleMinMaxStretch', 'animateRuleStepUpDown',
    'color', 'textAlign', 'textColor','backgroundColor','borderColor','outlineColor'
  ],

  size: 'huge',
  width: null,
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
  animateRuleStepUpDown: 'bounce'
});