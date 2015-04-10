import Ember from 'ember';
import layout from '../templates/components/number-input';
import BaseInput from '../components/ui-base-input';

export default BaseInput.extend({
  layout: layout,
  classNames: ['ui-number-input', 'number-input'],
  attributeBindings: ['min','max','step'],
  type: 'number',
  pattern: '[0-9]*',
  min: null,
  max: null,
  step: null
  
});
