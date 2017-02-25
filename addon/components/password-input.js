import Ember from 'ember';
const { computed } = Ember;  

import uiInput from 'ui-input/components/text-input';
import layout from '../templates/components/text-input';

const input = uiInput.extend({
  layout: layout,
  showPassword: false,
  autoComplete: false,
  type: computed('showPassword', {
    set(_,value) {
      return value;
    },
    get() {
      return this.get('showPassword') ? 'text' : 'password';
    }
  }),

});
input[Ember.NAME_KEY] = 'password-input';
export default input;
