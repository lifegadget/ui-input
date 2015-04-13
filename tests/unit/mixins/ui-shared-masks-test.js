import Ember from 'ember';
import UiSharedMasksMixin from 'ui-input/mixins/ui-shared-masks';
import { module, test } from 'qunit';

module('UiSharedMasksMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiSharedMasksObject = Ember.Object.extend(UiSharedMasksMixin);
  var subject = UiSharedMasksObject.create();
  assert.ok(subject);
});
