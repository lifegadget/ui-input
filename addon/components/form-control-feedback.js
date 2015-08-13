import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const {computed, observer, $, A, run, on, typeOf, debug, defineProperty, get, set, inject, isEmpty} = Ember;  // jshint ignore:line

import layout from '../templates/components/form-control-feedback';
import UiStylingMixin from '../mixins/ui-shared-styling';

export default Ember.Component.extend(UiStylingMixin,{
  layout: layout,
  classNames: ['ui-input', 'form-control-feedback'],
  classNameBindings: ['_iconClass'],
  attributeBindings: ['_style:style'],
  zIndex: 999,
  colorize: true,
  color: computed('colorize','status', function(){
    const {colorize,status} = this.getProperties('colorize', 'status');
    const statusColors = {
      success: 'rgba(60, 118, 60, 0.9)',
      warning: 'rgba(138, 108, 58, 0.902)',
      error: 'rgba(169, 67, 65, 0.9)'
    };

    return colorize && status ? get(statusColors,status) : null;
  }),
  status: computed('group.status',{
    set(_,value) {
      return value;
    },
    get() {
      return this.get('group.status');
    }
  }),
  icon: computed('status','_iconFamily', function() {
    const statusMap = {
      'glyphicon': {
        'success': 'ok',
        'warning': 'warning-sign',
        'error': 'remove'
      },
      'fa': {
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle'
      }
    };
    const {status,_iconFamily} = this.getProperties('status','_iconFamily');
    return status ? get(statusMap, _iconFamily + '.' + status) : null;
  })
});
