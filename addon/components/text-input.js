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

  classy: computed('class', 'mood', '_size', 'skin', 'isEmpty', function() {
    const proxy = this.get('class') || '';
    const mood = this.get('mood');
    const moodStyle = mood && mood !== 'default' ? ` input-${mood}` : '';
    let skin = this.get('skin');
    if (typeOf(skin) === 'array') { skin = skin[0]; }
    let formControl = ' form-control';
    let skinClass = '';
    if(skin && skin !== 'default') {
      if(skin.slice(0,3) !== 'bs-') {
        formControl = '';
      }
      skinClass = ` skin-${skin}`;
    }
    const empty = this.get('isEmpty') ? ' empty' : '';
    return `ui-input${formControl}${skinClass} ${proxy}${moodStyle}${get(this, '_size')}${empty}`;
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

  isEmpty: computed('_value', function() {
    return Ember.isEmpty(this.get('_value'));
  }),

  /**
   * Takes the untyped value of the input control
   * and intelligently reinstates the proper type
   */
  typeCheck(untypedValue) {
    const {ifEmpty, type} = this.getProperties('ifEmpty', 'type');
    if (type === 'number') {
      return Number(untypedValue);
    }
    if (Ember.isEmpty(untypedValue) && ifEmpty) {
      switch(ifEmpty) {
        case 'null':
          return null;
        case 'undefined':
          return undefined;
      }
    }

    return untypedValue;
  },

  actions: {
    onBlur(evt) {
      const value = this.typeCheck(evt.target.value);
      this.handleDDAU('onBlur', {evt: evt, value: value}, value);
    },
    onChange(evt) {
      const value = this.typeCheck(evt.target.value);
      run.debounce(() => {
        this.handleDDAU('onChange', {evt: evt, value: value}, value);
      }, 25);
    }
  }

});
input[Ember.NAME_KEY] = 'text-input';
export default input;
