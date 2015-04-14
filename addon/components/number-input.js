import Ember from 'ember';
import layout from '../templates/components/number-input';
import NumericRules from '../mixins/ui-shared-rules-numeric';
import BaseInput from '../components/ui-base-input';

var NumberInput = BaseInput.extend(NumericRules,{
  layout: layout,
  classNames: ['ui-number-input', 'number-input'],
  classNameBindings: ['showSpinners::hide-spinners'],
  attributeBindings: ['min','max','step'],
  type: 'number',
  pattern: '[0-9]*',
  showSpinners: false,
  min: null,
  max: null,
  step: null,
  emptyIsNull: true, // if the value isn't set a number should be set to NULL not an empty string
  // RULES
  rules: ['numeric'],
  
});

NumberInput[Ember.NAME_KEY] = 'number-input component';
export default NumberInput; 
