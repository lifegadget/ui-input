import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [
    'size','width','height',
    'animateRuleLength',
    'color', 'textAlign', 'textColor','backgroundColor','borderColor','outlineColor'
  ],
  
  size: 'huge',
  width: null,
  height: null,
  color: 'default',
  textAlign: 'center',
  textColor: null,
  backgroundColor: null,
  borderColor: null,
  outlineColor: null, 
  animateRuleLength: null

});