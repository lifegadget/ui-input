import Ember from 'ember';
import layout from '../templates/components/perf-helper';

export default Ember.Component.extend({
  layout,
  willRender() {
    this.start = window.performance.now();
  },
  didRender() {
    this.stop = window.performance.now();
    console.log('input helper: ', this.stop - this.start);
  }
});
