import Ember from 'ember';
import layout from '../templates/components/input-feedback';
import SharedIconMixin from '../mixins/ui-shared-icons';
import SharedStatusMixin from '../mixins/ui-shared-status';


export default Ember.Component.extend(SharedIconMixin,SharedStatusMixin,{
  layout: layout,
  tagName: 'span',
  classNames: ['form-control-feedback'],
  classNameBindings: ['_status'],
  attributeBindings: ['aria:aria-hidden'],
  aria: 'true',
});
