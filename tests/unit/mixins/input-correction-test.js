import Ember from 'ember';
import InputCorrectionMixin from '../../../mixins/input-correction';
import { module, test } from 'qunit';

module('InputCorrectionMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var InputCorrectionObject = Ember.Object.extend(InputCorrectionMixin);
  var subject = InputCorrectionObject.create();
  assert.ok(subject);
});
