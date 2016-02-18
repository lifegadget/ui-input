import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observer, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, inject, isEmpty, merge } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

import layout from '../templates/components/ui-input-primative';

export default Ember.Component.extend({
  layout,
  tagName: '',
  name: null,
  disabled: false,
  id: computed('elementId', {
    set(_, value) {
      return value;
    },
    get() {
      return this.elementId;
    }
  })
});
