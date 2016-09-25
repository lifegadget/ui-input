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
  type: 'text',
  autoComplete: true,
  _autoComplete: computed('autoComplete', function() {
    return this.get('autoComplete') ? null : "new-password";
  }),
  init() {
    this._super(...arguments);
    this.changeValidation(null, this.get('value'));
    if(!this.get('elementId')) {
      this.set('elementId', 'ember-' + Math.random().toString(36).substr(2, 9));
    }
  },
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

  classy: computed('class', 'mood', '_size', 'skin', 'isEmpty', 'isValid', function() {
    let proxy = this.get('class') || '';
    let {mood, skin, isValid} = this.getProperties('mood', 'skin', 'isValid');
    let moodStyle = mood && mood !== 'default' ? ` input-${mood}` : '';
    if (typeOf(skin) === 'array') { skin = skin[0]; }
    let formControl = ' form-control';
    let skinClass = '';
    if(skin && skin !== 'default') {
      if(skin.slice(0,3) !== 'bs-') {
        formControl = '';
      }
      skinClass = ` skin-${skin}`;
    }
    let validity = '';
    if (isValid !== 'empty') {
      validity = ' ' + isValid;
    }
    const empty = this.get('isEmpty') ? ' empty' : '';
    return `ui-input${formControl}${skinClass} ${proxy}${moodStyle}${get(this, '_size')}${empty}${validity}`;
  }),

  // min: null,
  // max: null,
  // step: null,
  autocomplete: 'off',
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
  blurValidation() {
    return true;
  },
  changeValidation() {
    return true;
  },

  actions: {
    onBlur(evt) {
      const oldValue = this.get('value');
      const value = this.typeCheck($(evt.target).val());
      this.blurValidation(evt, value);
      this.handleDDAU('onBlur', {
        evt: evt,
        value: value,
        oldValue: oldValue,
        context: this
      }, value);
      evt.stopPropagation();
    },
    onChange(evt) {
      const oldValue = this.get('value');
      const value = this.typeCheck($(evt.target).val());
      this.changeValidation(evt, value);
      run.debounce(() => {
        this.handleDDAU('onChange', {
          evt: evt,
          value: value,
          oldValue: oldValue,
          context: this
        }, value);
      }, 25);
    },
    onSubmit(evt) {
      console.log('submitted', evt);
    }
  }

});
input.reopenClass({
  positionalParams: ['value']
});
input[Ember.NAME_KEY] = 'text-input';
export default input;
