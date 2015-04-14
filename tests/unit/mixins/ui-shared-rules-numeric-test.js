import Ember from 'ember';
import UiSharedRulesNumericMixin from '../../../mixins/ui-shared-rules-numeric';
import { module, test } from 'qunit';

module('UiSharedRulesNumericMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiSharedRulesNumericObject = Ember.Object.extend(UiSharedRulesNumericMixin);
  var subject = UiSharedRulesNumericObject.create();
  assert.ok(subject);
});
