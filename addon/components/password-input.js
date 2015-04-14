// import Ember from 'ember';
import BaseInput from '../components/ui-base-input';
import layout from '../templates/components/password-input';


export default BaseInput.extend({
  layout: layout,
  type: 'password',
  emptyIsNull: true
});
