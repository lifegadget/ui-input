import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-primitive', 'Integration | Component | input primitive', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{input-primitive}}`);

  assert.equal(this.$('input').length, 1);

  // Template block usage:"
  this.render(hbs`
    {{#input-primitive}}
      template block text
    {{/input-primitive}}
  `);

  assert.equal(this.$('input').length, 1);
});
