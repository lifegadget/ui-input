import Ember from 'ember';
import layout from '../templates/components/text-input';
import BaseInput from '../components/ui-base-input';
import SharedTextRules from '../mixins/ui-shared-rules-text';

export default BaseInput.extend(SharedTextRules,{
  layout: layout,
  classNames: ['text-input'],
  type: 'text',
  emptyIsNull: false,
  _rulesTypeLibrary: Ember.computed.alias('_rulesTextLibrary')
});
