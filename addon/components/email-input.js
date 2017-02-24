import Ember from 'ember';
import uiInput from 'ui-input/components/text-input';
import layout from '../templates/components/text-input';

const input = uiInput.extend({
  layout: layout,
  type: 'email',

  actions: {
    changeValidate(evt, value) {
      console.log('CHANGE VALIDATION', this);
      if(value === null || value === undefined || value === '') {
        if(this.get('isValid') !== 'empty') {
          this.set('isValid', 'empty');
          this.handleDDAU('onValidation', 'empty', {
            validity: 'empty',
            context: this
          });
        }
      }
      else if (value && value.trim().search(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) === -1) {
        if(this.get('isValid') !== 'invalid') {
          this.set('isValid', 'invalid');
          console.log('invalid');
          this.handleDDAU('onValidation', 'invalid', {
            validity: 'invalid',
            context: this
          });
        }
      } else {
        if(this.get('isValid') !== 'valid') {
          this.set('isValid', 'valid');
          this.handleDDAU('onValidation', 'valid', {
            validity: 'valid',
            context: this
          });
        }
      }
    },

  }


});
input[Ember.NAME_KEY] = 'email-input';
export default input;
