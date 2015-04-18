import Ember from 'ember';
import layout from '../templates/components/input-addon';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['ui-input','input-group-addon'],
  icon: null,
  text: null,
  checkbox: null,
  
});
