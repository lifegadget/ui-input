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
  actions: {
    firstName(first) {
      const name = Ember.assign({}, this.get('name'));
      name.first = first.value;
      this.set('name', name);
      this.handleDDAU('onChange', name, name);
    },
    lastName(last) {
      const name = Ember.assign({}, this.get('name'));
      name.last = last.value;
      this.set('name', name);
      this.handleDDAU('onChange', name, name);
    },
    blur() {
      const name = this.get('name');
      this.handleDDAU('onBlur', name, name);
    }
  }
});
