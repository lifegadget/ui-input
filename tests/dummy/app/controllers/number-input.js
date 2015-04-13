import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [
    'size','width','height','min','max',
    'animateRuleMin','animateRuleMax','animateRuleMinStretch','animateRuleMaxStretch', 
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
  animateRuleMin: 'tada',
  animateRuleMax: 'tada',
  animateRuleMinStretch: 'rubberBand',
  animateRuleMaxStretch: 'rubberBand',
  
});