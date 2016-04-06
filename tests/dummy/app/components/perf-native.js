import Ember from 'ember';
import layout from '../templates/components/perf-native';

export default Ember.Component.extend({
  layout,
  willRender() {
    this.start = window.performance.now();
  },
  didRender() {
    this.stop = window.performance.now();
    console.log('native: ', this.stop - this.start);
  }
});
