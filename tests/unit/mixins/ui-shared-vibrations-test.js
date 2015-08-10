import Ember from 'ember';
import UiSharedVibrationsMixin from 'ui-input/mixins/ui-shared-vibrations';
import { module, test } from 'qunit';

module('UiSharedVibrationsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiSharedVibrationsObject = Ember.Object.extend(UiSharedVibrationsMixin);
  var subject = UiSharedVibrationsObject.create();
  assert.ok(subject);
});
