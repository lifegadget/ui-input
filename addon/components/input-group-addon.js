import Ember from 'ember';
import layout from '../templates/components/input-group-addon';

const addon = Ember.Component.extend({
  layout,
  tagName: '',
  icon: Ember.computed('preIcon', 'postIcon', {
    set(_, value) {
      return value;
    },
    get() {
      return this.get('preIcon') || this.get('postIcon');
    }
  })

});
addon[Ember.NAME_KEY] = 'input-group-addon';
addon.reopenClass({
  positionalParams: ['content']
});
export default addon;
