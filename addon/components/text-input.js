import Ember from 'ember';
const { computed,  $, run,  typeOf } = Ember;  

import { v4 } from 'ember-uuid';
import layout from '../templates/components/text-input';
import ddau from '../mixins/input-ddau';
import ValidationSet from '../utils/validation-set';

const input = Ember.Component.extend(ddau, {
  layout,
  type: 'text',
  tagName: '',
  align: 'left',
  id: computed(function() { return v4(); }),
  groupLayout: computed.or('pre', 'preIcon', 'preButton', 'button', 'icon', 'preButton', 'postButton', 'postIcon'),

  autoComplete: true,
  _autoComplete: computed('autoComplete', function() {
    return this.get('autoComplete') ? null : "new-password";
  }),
  init() {
    this._super(...arguments);
    this._validators = [];
    this.validationState = {};
    this.checkAPI(); // validate usage is inline with installed addons
  },
  didInsertElement() {
    if(!this.get('groupLayout')) {
      this.changeValidate(null, this.get('value'));
    }
  },
  didRender() {
    const id = this.get('id');
    const focus = this.get('focus');
    const target = window.document.getElementById(`${id}`);
    if(target) {
      target.addEventListener('keyup', this.onEnterPressed.bind(this), {once: true});
    } else {
      Ember.debug(`Couldn't setup Enter event listener for id "${id}"`);
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
      this.handleDDAU('onSubmit', value, {
        evt: e,
        value: value,
        oldValue: oldValue,
        context: this
      });
    }
  },
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

  classy2: computed('class', 'mood', '_size', 'skin', 'isEmpty', 'isValid', 'align', 'hideSpinners', function() {
    let proxy = this.get('class') || '';
    let {mood, skin, isValid, align, hideSpinners, _size} = this.getProperties('mood', 'skin', 'isValid', 'align', 'hideSpinners', '_size');
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
    let validity = isValid ? ' valid' : ' invalid';
    const empty = this.get('isEmpty') ? ' empty' : '';
    return `ui-input${formControl}${skinClass} ${proxy}${moodStyle}${_size}${empty}${validity}${alignStyle}${spinners}`;
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
      return untypedValue ? Number(untypedValue) : undefined;
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

  addValidators(validations) {
    return this.addValidator(validations);
  },

  addValidator(validations) {
    if (Ember.typeOf(validations) !== 'array') {
      validations = validations ? [ validations ] : [];
    }
    this._validators = this._validators.concat(validations);
  },

  changeValidate(evt, value) {
    const validations = this._validators.filter(v => v.trigger === 'change');
    this.validate(evt, value, validations);
  },

  blurValidate(evt, value) {
    const validations = this._validators.filter(v => v.trigger === 'blur');
    this.validate(evt, value, validations);
  },

  validate(evt, value, validations) {
    if(validations.length === 0) {
      return; // no validations so stop
    }
    const validationSet = new ValidationSet(evt, value, this.validationState);
    validationSet.validate(validations);
    validationSet.sendActions(this.handleDDAU.bind(this)); // onValidation, onError, onWarning
    this.validationState = validationSet.updatedState();
  },

  actions: {
    onBlur(evt) {
      const oldValue = this.get('value');
      const type = this.get('type');
      const value = this.typeCheck($(evt.target).val());
      this.blurValidate(evt, value);
      this.handleDDAU('onBlur', value, {
        evt: evt,
        type,
        oldValue,
        context: this
      });
      evt.stopPropagation();
    },
    onChange(evt) {
      const oldValue = this.get('value');
      const {id, type} = this.getProperties('id', 'type');
      const value = this.typeCheck($(`#${id}`).val());
      this.changeValidate(evt, value);
      run.debounce(() => {
        this.handleDDAU('onChange', value, {
          evt: evt,
          type,
          oldValue,
          context: this
        });
      }, 25);
    },
    onSubmit(evt) {
      console.log('submitted event not implemented yet', evt);
    },
    onPressed(location, button) {
      // ensure that even if container is listening on onBlur that we return the
      // most current value on the page
      const value = window.document.getElementById(this.get('id')).value;
      const type = this.get('type');
      // send event
      this.handleDDAU('onPressed', value, {
        location,
        type,
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
