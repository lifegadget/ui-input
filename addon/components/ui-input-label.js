import Ember from 'ember';
import layout from '../templates/components/ui-input-label';

const label = Ember.Component.extend({
  layout,
  tagName: '',
});
label[Ember.NAME_KEY] = 'input-group-label';
label.reopenClass({
  positionalParams: ['content']
});
export default label;
