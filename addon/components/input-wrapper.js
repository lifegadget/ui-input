import Ember from 'ember';
import layout from '../templates/components/input-wrapper';
import SharedSizeMixin from '../mixins/ui-shared-size';
import SharedIconMixin from '../mixins/ui-shared-icons';
// import config from '../config/environment';

export default Ember.Component.extend(SharedSizeMixin,SharedIconMixin, {
  layout: layout,
  classNames: ['ui-input', 'input-group'],
  
  style: 'bootstrap',
  
  hasPrefix: Ember.on('didInsertElement', Ember.computed('prefixIcon','prefixText', function() {
    let { prefixIcon, prefixText } = this.getProperties('prefixIcon','prefixText');
    return prefixIcon || prefixText ? true : false;
  })),
  hasPostfix: Ember.on('didInsertElement', Ember.computed('postfixIcon','postfixText', function() {
    let { postfixIcon, postfixText } = this.getProperties('postfixIcon','postfixText');
    return postfixIcon || postfixText ? true : false;
  }))
});
