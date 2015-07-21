import Ember from 'ember';
import layout from '../templates/components/button-addon';
import SharedIconMixin from '../mixins/ui-shared-icons';


export default Ember.Component.extend(SharedIconMixin,{
  layout: layout,
  tagName: 'span',
  classNames: ['ui-input','input-group-btn'],
  title: null,
  value: null,

  click: function (evt) {
    if(this.get('hasCheckbox') && !this.$(evt.target).hasClass('ember-checkbox')) {
      this.toggleProperty('value');
    }
  }

});
