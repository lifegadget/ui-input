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
      const name = this.get('name');
      name.first = first.value;
      console.log(`first: ${name.first}, last: ${name.last}`);
      this.handleDDAU('onChange', name, name);
    },
    lastName(last) {
      const name = this.get('name');
      name.last = last.value;
      console.log(`first: ${name.first}, last: ${name.last}`);
      this.handleDDAU('onChange', name, JSON.parse(JSON.stringify(name)));
    },
    blur() {
      const name = this.get('name');
      console.log('blurring', name);
      this.handleDDAU('onBlur', name, JSON.parse(JSON.stringify(name)));
    }
  }
});
