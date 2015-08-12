import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('ui-base-input', 'Integration | Component | ui base input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-base-input}}`);

  assert.equal(this.$().text().trim(), '');

});

test('setting bound value changes value', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('value', 'foo');

  this.render(hbs`
    {{ui-base-input value=value}}
  `);

  assert.equal(this.$('input').val(),'foo', 'value starts as foo');
  this.set('value', 'bar');
  assert.equal(this.$('input').val(),'bar', 'and changes to bar');
});
