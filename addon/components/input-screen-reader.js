import Ember from 'ember';
import layout from '../templates/components/input-screen-reader';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['sr-only'],
  hasContent: Ember.on('init', Ember.computed('sr',function() {
    return this.get('sr') ? true : false;
  }))
});
