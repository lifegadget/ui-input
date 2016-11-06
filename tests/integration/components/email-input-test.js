import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';


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
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
  this.set('value', null);
  this.render(hbs`{{email-input value=value onValidity=(mut validity)}}`);
  assert.equal(this.get('validity'), 'empty', 'null value is set to empty validity');

});

test('validity check on valid @ instantiation', function(assert) {

  this.set('value', 'jack@johnson.com');
  this.render(hbs`{{email-input value=value onValidity=(mut validity)}}`);
  assert.equal(this.get('validity'), 'valid', 'valid email tests positively');

});

test('validity check on invalid @ instantiation', function(assert) {

  this.set('value', 'jack@johnson');
  this.render(hbs`{{email-input value=value onValidity=(mut validity)}}`);
  assert.equal(this.get('validity'), 'invalid', 'invalid email tests negatively');

});


test('validity check through empty @ lifecycle', function(assert) {

  this.set('value', null);
  this.render(hbs`{{email-input value=value onValidity=(mut validity)}}`);
  assert.equal(this.get('validity'), 'empty', 'null value is set to empty validity');

});

test('validity check through valid @ lifecycle', function(assert) {

  this.render(hbs`{{email-input value=value onValidity=(mut validity)}}`);
  Ember.run.next(() => {
    this.$('input').val('jack@johnson.com');
    this.$('input').trigger('input');
    assert.equal(this.get('validity'), 'valid', 'valid email tests positively');
  });

});

test('validity check through invalid @ lifecycle', function(assert) {

  this.render(hbs`{{email-input value=value onValidity=(mut validity)}}`);
  Ember.run.next(() => {
    this.$('input').val('jack').trigger('input');
    assert.equal(this.get('validity'), 'invalid', 'invalid email tests negatively');
  });

});
