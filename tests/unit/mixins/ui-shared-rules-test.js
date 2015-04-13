import Ember from 'ember';
import UiSharedRulesMixin from 'ui-input/mixins/ui-shared-rules';
import { module, test } from 'qunit';

module('UiSharedRulesMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiSharedRulesObject = Ember.Object.extend(UiSharedRulesMixin);
  var subject = UiSharedRulesObject.create();
  assert.ok(subject);
});
