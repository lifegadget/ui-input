import Ember from 'ember';
import UiInputStylingMixin from '../../../mixins/ui-input-styling';
import { module, test } from 'qunit';

module('UiInputStylingMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiInputStylingObject = Ember.Object.extend(UiInputStylingMixin);
  var subject = UiInputStylingObject.create();
  assert.ok(subject);
});
