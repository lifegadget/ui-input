import Ember from 'ember';
import layout from '../templates/components/input-group-button';

const button = Ember.Component.extend({
  layout,
  tagName: '',

});
button[Ember.NAME_KEY] = 'input-group-button';
button.reopenClass({
  positionalParams: ['title']
});
export default button;
