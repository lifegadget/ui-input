import Ember from 'ember';
import uiInput from 'ui-input/components/text-input';
import layout from '../templates/components/text-input';
import Validator from '../utils/validator';
import emailValidator from 'ui-input/validators/email-validation';

// Set the "isValid" property on every emailValidation check
const emailIsValid = (context) => (validator) => {
  context.set('isValid', validator.code === 'ok')
};

const input = uiInput.extend({
  layout: layout,
  type: 'email',
  init() {
    this._super(...arguments);
    const emailValidation = new Validator('emailValidator', emailValidator, {
      context: this,
      trigger: 'change',
      domains: this.get('validDomains'),
      callbacks: [ emailIsValid ].map(cb => cb(this))
    });
    this.addValidator(emailValidation);
  }
});
input[Ember.NAME_KEY] = 'email-input';
export default input;
