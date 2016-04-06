import Ember from 'ember';
import layout from '../templates/components/perf-component';

export default Ember.Component.extend({
  layout,
  willRender() {
    this.start = window.performance.now();
  },
  didRender() {
    this.stop = window.performance.now();
    console.log('component: ', this.stop - this.start);
  }
});
