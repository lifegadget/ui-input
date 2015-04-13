import Ember from 'ember';
import UiEventListenerMixin from 'ui-input/mixins/ui-event-listener';
import { module, test } from 'qunit';

module('UiEventListenerMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UiEventListenerObject = Ember.Object.extend(UiEventListenerMixin);
  var subject = UiEventListenerObject.create();
  assert.ok(subject);
});
