import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['style','text', 'icon', 'checkbox', 'radio','button'],
  style: 'bootstrap',
  checkbox: false,
  radio: false,
  button: false,
  iconFamily: 'fa'

});