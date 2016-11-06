import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observer, $, run, on, typeOf, isPresent } = Ember;  // jshint ignore:line
const { defineProperty, get, set, inject, isEmpty, merge } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

import { v4 } from 'ember-uuid';
import layout from '../templates/components/text-input';
import ddau from '../mixins/input-ddau';

const input = Ember.Component.extend(ddau, {
  layout,
  type: 'text',
  tagName: '',
  align: 'left',
  autoComplete: true,
  _autoComplete: computed('autoComplete', function() {
    return this.get('autoComplete') ? null : "new-password";
  }),
  init() {
    this._super(...arguments);
    this.changeValidation(null, this.get('value'));
    this.checkAPI(); // validate usage is inline with installed addons
  },
  didRender() {
    const id = this.get('id');
    const focus = this.get('focus');
    const target = window.document.getElementById(`input-${id}`);
    if(target) {
      target.addEventListener('keyup', this.onEnterPressed.bind(this), {once: true});
    } else {
      Ember.debug(`Couldn't setup Enter event listener for id "input-${id}""`);
    }
    if(focus && target) {
      target.focus();
    }
  },
  willDestroyElement() {
    const id = this.get('id');
    const target = window.document.getElementById(id);
    if(target) {
      target.removeEventListener('keyup', this.onEnterPressed.bind(this));
    }
  },
  onEnterPressed(e) {
    if(e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      const oldValue = this.get('value');
      const value = this.typeCheck($(e.target).val());
      this.handleDDAU('onSubmit', {
        evt: e,
        value: value,
        oldValue: oldValue,
        context: this
      }, value);
    }
  },
  id: Ember.computed(function() {
    return v4();
  }),
  /**
   * Check API usage to ensure that all dependant
   * addons are in place to render this component
   * successfully
   */
  checkAPI() {
    const id = this.get('id');
    const deps = {
      ['ui-button']: ['button', 'preButton', 'postbutton'],
      ['ui-icon']: ['icon', 'preIcon', 'postIcon'],
    };
    Object.keys(deps).forEach(key => {
      const props = deps[key];
      const dependantAddon = Ember.getOwner(this).lookup(`component:${key}`);
      if(!dependantAddon) {
        props.forEach(prop => {
          if(prop) {
            Ember.debug(`The "ui-input" component detected your use of the "${prop}" property in instance "${id}"; in order to use this part of the API you must install the "${key}" addon.`);
          }
        });
      }
    });
  },
  // container sets "value" which overrides internal state
  // but allows input control to move mildly out of step
  // with container which is often desired (aka, onBlur)
  _value: computed('value', {
    set(_, value) {
      return value;
    },
    get() {
      return this.get('value');
    }
  }),
  pattern: computed('type', function() {
    switch(this.get('type')) {
      case 'number':
        return '[0-9]*';

      default:
        return '';
    }
  }),

  classy: computed('class', 'mood', '_size', 'skin', 'isEmpty', 'isValid', 'align', 'hideSpinners', function() {
    let proxy = this.get('class') || '';
    let {mood, skin, isValid, align, hideSpinners} = this.getProperties('mood', 'skin', 'isValid', 'align', 'hideSpinners');
    let alignStyle = align ? ` input-align-${align}` : '';
    let moodStyle = mood && mood !== 'default' ? ` input-${mood}` : '';
    let spinners = hideSpinners === false ? ' hide-spinners' : '';
    if (typeOf(skin) === 'array') { skin = skin[0]; }
    let formControl = ' form-control';
    let skinClass = '';
    if(skin && skin !== 'default') {
      if(skin.slice(0,3) !== 'bs-') {
        formControl = '';
      }
      skinClass = ` skin-${skin}`;
    }
    let validity = isValid !== undefined ? ' ' + isValid : '';
    const empty = this.get('isEmpty') ? ' empty' : '';
    return `ui-input${formControl}${skinClass} ${proxy}${moodStyle}${get(this, '_size')}${empty}${validity}${alignStyle}${spinners}`;
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
    },
    onPressed(location, button) {
      // ensure that even if container is listening on onBlur that we return the
      // most current value on the page
      const value = window.document.getElementById(`input-${this.get('id')}`).value;
      // send event
      this.handleDDAU('onPressed', {
        location,
        button,
        value: this.typeCheck(value),
        context: this
      });
    },
  },

});
input.reopenClass({
  positionalParams: ['value']
});
input[Ember.NAME_KEY] = 'text-input';
export default input;
