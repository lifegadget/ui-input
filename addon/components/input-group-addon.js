import Ember from 'ember';
import layout from '../templates/components/input-group-addon';

export default Ember.Component.extend({
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
