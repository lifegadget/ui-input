import Ember from 'ember';
import layout from '../templates/components/number-input';
import BaseInput from '../components/ui-base-input';

export default BaseInput.extend({
  layout: layout,
  classNames: ['text-input'],
  type: 'text'
  
});
