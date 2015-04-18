import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [
    'size','width','height','rules',
    'animateRuleLength',
    'color', 'textAlign', 'textColor','backgroundColor','borderColor','outlineColor'
  ],
  
  size: 'huge',
  width: '50%',
  height: null,
  length: null,
  color: 'default',
  textAlign: 'center',
  textColor: null,
  backgroundColor: null,
  borderColor: null,
  outlineColor: null, 
  rules:['lengthLimit'],
  animateRuleLength: null

});