import Ember from 'ember';
import BaseInput from '../components/ui-base-input';
import SharedSecurityRules from '../mixins/ui-shared-security';
import layout from '../templates/components/password-input';


export default BaseInput.extend(SharedSecurityRules,{
  layout: layout,
  type: 'password',
  emptyIsNull: true,
  _rulesTypeLibrary: Ember.computed.alias('_securityRulesLibrary'),
  // done so that container can bind to variable without erasing its default state
  // TODO: investigate why the oneWay binding wasn't working
  _defaultRulesInitializer: Ember.on('didInsertElement', function() {
    this.set('defaultRules', ['securePassword']);
  }),
  defaultRules: null,
  
  
});
