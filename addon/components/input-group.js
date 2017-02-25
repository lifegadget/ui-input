import Ember from 'ember';
import layout from '../templates/components/input-group';

const group = Ember.Component.extend({
  layout: layout,
  tagName: '',
  type: 'text',
  classy: Ember.computed('class', 'name', function() {
    const c = this.get('class');
    const name = this.get('name');
    const classes = [];
    if (c) { classes.push(c); }
    if (name) { classes.push(name); }

    return classes.length > 0 ? ` ${classes.join(' ')}` : null;
  }),

  actions: {
    onBlur() {
      if(this.attrs.onBlur) {
        this.attrs.onBlur(...arguments);
      }
    },
    onChange() {
      if(this.attrs.onChange) {
        this.attrs.onChange(...arguments);
      }
    },
    onSubmit() {
      if(this.attrs.onSubmit) {
        this.attrs.onSubmit(...arguments);
      }
    },
    onPressed() {
      if(this.attrs.onPressed) {
        this.attrs.onPressed(...arguments);
      }
    },

  }
});
group[Ember.NAME_KEY] = 'input-group';
export default group;
