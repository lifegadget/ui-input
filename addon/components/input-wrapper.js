import Ember from 'ember';
import layout from '../templates/components/input-wrapper';
import SharedSizeMixin from '../mixins/ui-shared-size';

export default Ember.Component.extend(SharedSizeMixin, {
  layout: layout,
  classNames: ['ui-input', 'wrapper', 'input-group'],
  classNameBindings: ['_status','hasPrefix:includes-prefix','hasPostfix:includes-postfix'],
  status: null,
  _status: Ember.on('init', Ember.computed('status', function() {
    let status = this.get('status');
    return status ? `has-${status}` : null;
  })),
  groupInputClass: Ember.on('init', Ember.computed('_sizeClass', 'status', function() {
    let staticClasses = [ 'input-group' ];
    let dynamicClasses = [ this.get('_sizeClass') ];
    let status = this.get('status');
    if (status) {
      dynamicClasses.push(`has-${status}`);
    }

    return staticClasses.concat(dynamicClasses).join(' ');
  })),

  style: 'bootstrap',
  register: function() {
    // TODO
  },

  // SECTIONAL FLAGS
  hasPrefix: Ember.on('willRender', Ember.computed('prefixIcon','prefixText', 'prefixCheckbox', function() {
    let { prefixIcon, prefixText, prefixCheckbox } = this.getProperties('prefixIcon','prefixText', 'prefixCheckbox');
    return prefixIcon || prefixText || prefixCheckbox ? true : false;
  })),
  hasPostfix: Ember.on('willRender', Ember.computed('postfixIcon','postfixText', function() {
    let { postfixIcon, postfixText } = this.getProperties('postfixIcon','postfixText');
    return postfixIcon || postfixText ? true : false;
  })),
  hasAddons: Ember.computed.or('hasPrefix','hasPostfix'),
  feedback: false,
  hasFeedback: Ember.on('init',Ember.computed('status','feedback',function() {
    let status = this.get('status');
    let feedback = this.get('feedback');
    return status && feedback ? true : false;
  })),
  hasScreenReader: Ember.on('init', Ember.computed('sr', function() {
    return this.get('sr') ? true : false;
  })),

  // State Interactions
  // (aka, prefix/postfix interactions with the INPUT component)
  // ------------------
  disableNotChecked: false,
  _disableNotChecked: Ember.on('willRender', Ember.observer('disableNotChecked','prefixValue','postfixValue',function() {
    let { disableNotChecked, prefixValue, postfixValue } = this.getProperties('disableNotChecked','prefixValue','postfixValue');
    let enabled  = prefixValue || postfixValue ? true : false;
    if (disableNotChecked) {
      if(enabled) {
        this.$('input.ui-input').removeAttr('disabled');
      } else {
        this.$('input.ui-input').attr('disabled', 'disabled');
      }
    } else {
      if(this.$('input.ui-input')) {
        this.$('input.ui-input').removeAttr('disabled');
      }
    }
  }))
});
