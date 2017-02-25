import Ember from 'ember';
const { computed } = Ember;  

import layout from '../templates/components/name-input';
import ddau from '../mixins/input-ddau';


export default Ember.Component.extend(ddau, {
  layout,
  tagName: '',
  name: computed(() => ({})),
  previous: computed(() => ({})),
  actions: {
    firstName(first) {
      const oldValue = this.get('name');
      const name = Ember.assign({}, oldValue);
      name.first = first;
      this.set('name', name);
      this.handleDDAU('onChange', name, {
        oldValue,
        type: 'object'
      });
    },
    lastName(last) {
      const oldValue = this.get('name');
      const name = Ember.assign({}, oldValue);
      name.last = last;
      this.set('name', name);
      this.handleDDAU('onChange', name, {
        oldValue,
        type: 'object'
      });
    },
    blur() {
      const {name, previous} = this.getProperties('name', 'previous');
      this.set('previous', name);
      this.handleDDAU('onBlur', name, {
        oldValue: previous,
        type: 'object'
      });
    }
  }
});
