import Ember from 'ember';
import BaseInput from '../components/ui-base-input';
import SharedSecurityRules from '../mixins/ui-shared-security';
import layout from '../templates/components/password-input';
const { keys, create } = Object; // jshint ignore:line
const {computed, observer, $, A, run, on, typeOf, debug, defineProperty, get, set, inject, isEmpty} = Ember;  // jshint ignore:line

export default BaseInput.extend(SharedSecurityRules,{
  layout: layout,
  type: 'password',
  emptyIsNull: true,
  showPassword: false,
  _showPassword: Ember.on('init', Ember.observer('showPassword', function() {
    if(this.get('showPassword')) {
      this.set('type', 'text');
    } else {
      this.set('type', 'password');
    }
  })),
  _rulesTypeLibrary: Ember.computed.alias('_securityRulesLibrary'),
  defaultRules: computed({
    set(_,value) {
      return value;
    },
    get() {
      return ['securePassword'];
    }
  })
});
