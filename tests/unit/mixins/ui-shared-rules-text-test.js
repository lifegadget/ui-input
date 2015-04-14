import Ember from 'ember';
import UiSharedRulesTextMixin from '../../../mixins/ui-shared-rules-text';
import { module, test } from 'qunit';

module('UiSharedRulesTextMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiSharedRulesTextObject = Ember.Object.extend(UiSharedRulesTextMixin);
  var subject = UiSharedRulesTextObject.create();
  assert.ok(subject);
});
