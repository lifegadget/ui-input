// import Ember from 'ember';
import BaseInput from '../components/ui-base-input';
import SharedTextRules from '../mixins/ui-shared-rules-text';
import layout from '../templates/components/password-input';


export default BaseInput.extend(SharedTextRules,{
  layout: layout,
  type: 'password',
  emptyIsNull: true
});
