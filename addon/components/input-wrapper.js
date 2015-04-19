import Ember from 'ember';
import layout from '../templates/components/input-wrapper';
import SharedSizeMixin from '../mixins/ui-shared-size';
import SharedIconMixin from '../mixins/ui-shared-icons';
// import config from '../config/environment';

export default Ember.Component.extend(SharedSizeMixin, {
  layout: layout,
  classNames: ['ui-input', 'input-group'],
  
  style: 'bootstrap',
  
  hasPrefix: Ember.on('didInsertElement', Ember.computed('prefixIcon','prefixText', 'prefixCheckbox', function() {
    let { prefixIcon, prefixText, prefixCheckbox } = this.getProperties('prefixIcon','prefixText', 'prefixCheckbox');
    return prefixIcon || prefixText || prefixCheckbox ? true : false;
  })),
  hasPostfix: Ember.on('didInsertElement', Ember.computed('postfixIcon','postfixText', function() {
    let { postfixIcon, postfixText } = this.getProperties('postfixIcon','postfixText');
    return postfixIcon || postfixText ? true : false;
  })),
  
  // State Interactions
  // (aka, prefix/postfix interactions with the INPUT component)
  // ------------------
  disableNotChecked: false,
  _disableNotChecked: Ember.on('didInsertElement', Ember.observer('disableNotChecked','prefixValue','postfixValue',function() {
    let { disableNotChecked, prefixValue, postfixValue } = this.getProperties('disableNotChecked','prefixValue','postfixValue');
    let enabled  = prefixValue || postfixValue ? true : false;
    if (disableNotChecked) {
      if(enabled) {
        this.$('input.ui-input').removeAttr('disabled');      
      } else {
        this.$('input.ui-input').attr('disabled', 'disabled'); 
      }      
    } else {
      this.$('input.ui-input').removeAttr('disabled');
    }
  }))
});
