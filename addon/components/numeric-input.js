// import Ember from 'ember';
import layout from '../templates/components/text-input';
import textInput from 'ui-input/components/text-input';

export default textInput.extend({
  layout,
  type: 'number',
  step: 1,

});
