import Ember from 'ember';
const { computed } = Ember;  

import layout from '../templates/components/input-primitive';
import ddau from '../mixins/input-ddau';
import { v4 } from 'ember-uuid';

export default Ember.Component.extend(ddau, {
  layout,
  tagName: '',
  name: null,
  disabled: false,
  id: Ember.computed(function() {
    return v4();
  }),
  _label: computed('label', function() {
    const {label, type} = this.getProperties('label', 'type');
    return label ? `${type} input for "${label}"` : undefined;
  }),

  actions: {
    onBlur(evt) {
      this.handleDDAU('onBlur', evt.target.value, evt);
    },
    onChange(evt) {
      Ember.run.debounce(this, () => {
        this.handleDDAU('onChange', evt.target.value, evt);
      },75);
    }
  }
});
