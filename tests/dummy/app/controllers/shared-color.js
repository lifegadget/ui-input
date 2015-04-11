import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['myStyle','myClassColor', 'textColor','backgroundColor','borderColor','outlineColor'],

  myClassColor: 'default',
  myStyle: 'bootstrap',
  
  textColor: null,
  backgroundColor: null,
  borderColor: null,
  outlineColor: null

});