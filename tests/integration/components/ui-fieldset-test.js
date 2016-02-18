import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-fieldset', 'Integration | Component | ui fieldset', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{ui-fieldset}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#ui-fieldset}}
      template block text
    {{/ui-fieldset}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
