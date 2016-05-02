import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('text-input', 'Integration | Component | text input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{text-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#text-input}}
      template block text
    {{/text-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('initialized value is represented in DOM element', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{text-input value='foobar'}}`);

  assert.equal(this.$('input').val(), 'foobar');

  // Template block usage:"
  this.render(hbs`
    {{#text-input value='foobar' as |g|}}
      {{g.input}}
    {{/text-input}}
  `);

  assert.equal(this.$('input').val(), 'foobar');
});

test('modifying DOM\'s value changes inline component value through ddau', function(assert) {
  assert.expect(5);
  const done = assert.async();

  this.on('onBlur', function(hash) {
    console.log(hash);
    assert.equal(hash.oldValue, 'foobar', 'changed detected with correct old value');
    assert.equal(hash.value, 'foobaz', 'changed detected with correct new value');
    assert.ok(hash.context, 'found context object on action');
    this.set('completed', true);
    done();
  });

  this.render(hbs`{{text-input value='foobar' onBlur=(action 'onBlur')}}`);

  assert.equal(this.$('input').val(), 'foobar', 'initial value correct');
  this.$('input').val('foobaz');
  assert.equal(this.$('input').val(), 'foobaz', 'DOM changed as expected');
  this.$('input').blur();

  setTimeout(() => {
    if(!this.get('completed')) {
      done();
    }
  }, 500);
});

test('modifying DOM\'s value changes block component value through ddau', function(assert) {
  assert.expect(5);
  const done = assert.async();

  this.on('onBlur', function(hash) {
    console.log(hash);
    assert.equal(hash.oldValue, 'foobar', 'changed detected with correct old value');
    assert.equal(hash.value, 'foobaz', 'changed detected with correct new value');
    assert.ok(hash.context, 'found context object on action');
    this.set('completed', true);
    done();
  });

  this.render(hbs`
    {{#text-input value='foobar' onBlur=(action 'onBlur') as |g|}}
      {{g.input}}
    {{/text-input}}
  `);

  assert.equal(this.$('input').val(), 'foobar', 'initial value correct');
  this.$('input').val('foobaz');
  assert.equal(this.$('input').val(), 'foobaz', 'DOM changed as expected');
  this.$('input').blur();

  setTimeout(() => {
    if(!this.get('completed')) {
      done();
    }
  }, 500);
});

test('modifying component value from container changes DOM value', function(assert) {
  this.set('myValue', 'foobar');

  this.render(hbs`
    {{#text-input value=myValue as |g|}}
      {{g.input}}
    {{/text-input}}
  `);

  assert.equal(this.$('input').val(), 'foobar', 'initial value correct');
  this.set('myValue', 'foobaz');
  assert.equal(this.$('input').val(), 'foobaz', 'DOM changed as expected');

});
