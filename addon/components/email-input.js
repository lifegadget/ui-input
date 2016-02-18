import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observer, $, run, on, typeOf, isPresent } = Ember;  // jshint ignore:line
const { defineProperty, get, set, inject, isEmpty, merge } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

import uiInput from 'ui-input/components/text-input';
import layout from '../templates/components/text-input';

const input = uiInput.extend({
  layout: layout,
  type: 'email',

});
input[Ember.NAME_KEY] = 'email-input';
export default input;
