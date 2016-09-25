import Ember from 'ember';
import layout from '../templates/components/input-group';
import { v4 } from 'ember-uuid';

const group = Ember.Component.extend({
  layout: layout,
  tagName: '',
  type: 'text',
  id: Ember.computed(function() {
    return v4();
  }),
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
    }
  }
});
group[Ember.NAME_KEY] = 'input-group';
export default group;
