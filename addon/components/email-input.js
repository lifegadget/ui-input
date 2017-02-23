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

  changeValidation(evt, value) {
    if(value === null || value === undefined || value === '') {
      if(this.get('isValid') !== 'empty') {
        this.set('isValid', 'empty');
        this.handleDDAU('onValidity', 'empty', {
          validity: 'empty',
          context: this
        });
      }
    }
    else if (value && value.trim().search(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) === -1) {
      if(this.get('isValid') !== 'invalid') {
        this.set('isValid', 'invalid');
        this.handleDDAU('onValidity', 'invalid', {
          validity: 'invalid',
          context: this
        });
      }
    } else {
      if(this.get('isValid') !== 'valid') {
        this.set('isValid', 'valid');
        this.handleDDAU('onValidity', 'valid', {
          validity: 'valid',
          context: this
        });
      }

    }
  }
});
input[Ember.NAME_KEY] = 'email-input';
export default input;
