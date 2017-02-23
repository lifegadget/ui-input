import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

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
