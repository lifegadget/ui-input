import Ember from 'ember';
import InputStatusMixin from '../../../mixins/input-status';
import { module, test } from 'qunit';

module('InputStatusMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var InputStatusObject = Ember.Object.extend(InputStatusMixin);
  var subject = InputStatusObject.create();
  assert.ok(subject);
});
