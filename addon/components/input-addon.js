import Ember from 'ember';
import layout from '../templates/components/input-addon';
import SharedIconMixin from '../mixins/ui-shared-icons';


export default Ember.Component.extend(SharedIconMixin,{
  layout: layout,
  tagName: 'span',
  classNames: ['ui-input','input-group-addon'],
  icon: null,
  text: null,
  radio: null,
  value: null,
  checkbox: null,
  hasCheckbox: Ember.computed.alias('checkbox'),
  iconFirst: true, // is icon before text or other way around
  
  click: function (evt) {
    if(this.get('hasCheckbox') && !this.$(evt.target).hasClass('ember-checkbox')) {
      this.toggleProperty('value');
    }
  }
  
});
