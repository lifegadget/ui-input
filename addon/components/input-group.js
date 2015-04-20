import Ember from 'ember';
import layout from '../templates/components/input-group';
import SharedIconMixin from '../mixins/ui-shared-icons';
import SharedSizeMixin from '../mixins/ui-shared-size';


export default Ember.Component.extend(SharedSizeMixin,{
  layout: layout,
  tagName: 'div',
  classNames: ['input-group']
  
});
