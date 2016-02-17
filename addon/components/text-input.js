import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observer, $, run, on, typeOf, isPresent } = Ember;  // jshint ignore:line
const { defineProperty, get, set, inject, isEmpty, merge } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

import layout from '../templates/components/text-input';
import ddau from '../mixins/input-ddau';

const input = Ember.Component.extend(ddau, {
  layout,
  tagName: '',
  type:'text',
  // container sets "value" which overrides internal state
  // but allows input controll to move mildly out of step
  // with container which is often desired (aka, onBlur)
  _value: computed('value', {
    set(_, value) {
      return value;
    },
    get() {
      return this.get('value');
    }
  }),

  classy: computed('class', 'mood', '_size', function() {
    const proxy = this.get('class') || '';
    const mood = this.get('mood');
    const moodStyle = mood && mood !== 'default' ? ` input-${mood}` : '';
    return `ui-input form-control ${proxy}${moodStyle}${get(this, '_size')}`;
  }),

  // min: null,
  // max: null,
  // step: null,
  autocomplete: false,
  autofocus: false,
  disabled: false,
  inputmode: 'latin-prose',
  name: null,
  title: null,
  placeholder: null,
  readonly: false,
  spellcheck: false,
  form: null,
  size: 'md',
  _size: computed('size', function() {
    const size = this.get('size');
    switch(size) {
      case 'hg':
      case 'huge':
        return ' form-control-huge';
      case 'lg':
      case 'large':
        return ' form-control-lg';
      case 'sm':
      case 'small':
        return ' form-control-sm';
      case 'tiny':
        return ' form-control-tiny';
      default:
        return '';
    }
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
input[Ember.NAME_KEY] = 'text-input';
export default input;
