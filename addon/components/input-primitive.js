import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observer, $, run, on, typeOf, isPresent } = Ember;  // jshint ignore:line
const { defineProperty, get, set, inject, isEmpty, merge } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

import layout from '../templates/components/input-primitive';
import ddau from '../mixins/input-ddau';


export default Ember.Component.extend(ddau, {
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
  }),
  _label: computed('label', function() {
    const {label, type} = this.getProperties('label', 'type');
    return label ? `${type} input for "${label}"` : undefined;
  }),

  actions: {
    onBlur(evt) {
      this.handleDDAU('onBlur', evt, evt.target.value);
    },
    onChange(evt) {
      this.handleDDAU('onChange', evt, evt.target.value);
    }
  }
});