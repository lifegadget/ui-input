import Ember from 'ember';
import InputDdauMixin from 'ui-input/mixins/input-ddau';
import { module, test } from 'qunit';

module('Unit | Mixin | input ddau');

// Replace this with your real tests.
test('it works', function(assert) {
  let InputDdauObject = Ember.Object.extend(InputDdauMixin);
  let subject = InputDdauObject.create();
  assert.ok(subject);
});
