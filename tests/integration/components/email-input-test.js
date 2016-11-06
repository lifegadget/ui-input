import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('email-input', 'Integration | Component | email input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{email-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#email-input}}
      template block text
    {{/email-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('validity check on empty @ instantiation', function(assert) {
  assert.expect(1);
  this.set('value', null);
  this.on('vTest', function(result) {
    assert.equal(result.validity, 'empty', 'null value is set to "empty" validity');
  });
  this.render(hbs`{{email-input value=value onValidity=(action 'vTest')}}`);
});

test('validity check on valid @ instantiation', function(assert) {
  assert.expect(1);
  this.set('value', 'jack@johnson.com');
  this.on('vTest', function(result) {
    assert.equal(result.validity, 'valid', 'valid email tests positively');
  });
  this.render(hbs`{{email-input value=value onValidity=(action 'vTest')}}`);
});

test('validity check on invalid @ instantiation', function(assert) {
  assert.expect(1);
  this.set('value', 'jack@johnson');
  this.on('vTest', function(result) {
    assert.equal(result.validity, 'invalid', 'invalid email tests negatively');
  });
  this.render(hbs`{{email-input value=value onValidity=(action 'vTest')}}`);
});

