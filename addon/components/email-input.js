import Ember from 'ember';
import BaseInput from '../components/ui-base-input';
import SharedTextRules from '../mixins/ui-shared-rules-text';
import SharedEmailRules from '../mixins/ui-shared-rules-email';
import layout from '../templates/components/password-input';


export default BaseInput.extend(SharedEmailRules, SharedTextRules, {
  layout: layout,
  type: 'email',
  emptyIsNull: true,
  _rulesTypeLibrary: Ember.on('init', Ember.computed(function() {
    let { _rulesTextLibrary, _rulesEmailLibrary } = this.getProperties('_rulesTextLibrary', '_rulesEmailLibrary');
    return _rulesEmailLibrary.concat(_rulesTextLibrary);
  })),
  defaultRules: null,
  // done so that container can bind to variable without erasing its default state
  // TODO: investigate why the oneWay binding wasn't working
  _defaultRulesInitializer: Ember.on('didInsertElement', function() {
    this.set('defaultRules', []);
  }),
});
