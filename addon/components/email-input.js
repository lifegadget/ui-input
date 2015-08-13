import Ember from 'ember';
import BaseInput from '../components/ui-base-input';
import SharedTextRules from '../mixins/ui-shared-rules-text';
import SharedEmailRules from '../mixins/ui-shared-rules-email';
import layout from '../templates/components/password-input';
const { keys, create } = Object; // jshint ignore:line
const {computed, observer, $, A, run, on, typeOf, debug, defineProperty, get, set, inject, isEmpty} = Ember;  // jshint ignore:line

export default BaseInput.extend(SharedEmailRules, SharedTextRules, {
  layout: layout,
  type: 'email',
  emptyIsNull: true,
  _rulesTypeLibrary: Ember.on('init', Ember.computed(function() {
    let { _rulesTextLibrary, _rulesEmailLibrary } = this.getProperties('_rulesTextLibrary', '_rulesEmailLibrary');
    return _rulesEmailLibrary.concat(_rulesTextLibrary);
  })),
  defaultRules: computed({
    set(_,value) {
      return value;
    },
    get() {
      return [];
    }
  })
});
