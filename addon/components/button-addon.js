import Ember from 'ember';
import layout from '../templates/components/button-addon';
import UiStylingMixin from '../mixins/ui-shared-styling';

export default Ember.Component.extend(UiStylingMixin,{
  layout: layout,
  tagName: 'span',
  classNames: ['ui-input','input-group-btn'],


});
