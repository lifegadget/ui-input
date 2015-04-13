import Ember from 'ember';
import UiStylingMixin from 'ui-input/mixins/ui-shared-styling';
import { module, test } from 'qunit';

module('UiStylingMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiStylingObject = Ember.Object.extend(UiStylingMixin);
  var subject = UiStylingObject.create();
  assert.ok(subject);
});
