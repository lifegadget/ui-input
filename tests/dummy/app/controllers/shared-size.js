import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['myStyle','myAlignment'],
  myStyle: 'bootstrap',
  myAlignment: 'left'

});