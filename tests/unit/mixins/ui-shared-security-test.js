import Ember from 'ember';
import UiSharedSecurityMixin from 'ui-input/mixins/ui-shared-security';
import { module, test } from 'qunit';

module('UiSharedSecurityMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiSharedSecurityObject = Ember.Object.extend(UiSharedSecurityMixin);
  var subject = UiSharedSecurityObject.create();
  assert.ok(subject);
});
