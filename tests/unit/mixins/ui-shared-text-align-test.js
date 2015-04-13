import Ember from 'ember';
import UiSharedTextAlignMixin from 'ui-input/mixins/ui-shared-text-align';
import { module, test } from 'qunit';

module('UiSharedTextAlignMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiSharedTextAlignObject = Ember.Object.extend(UiSharedTextAlignMixin);
  var subject = UiSharedTextAlignObject.create();
  assert.ok(subject);
});
