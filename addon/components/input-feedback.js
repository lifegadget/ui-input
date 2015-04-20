import Ember from 'ember';
import layout from '../templates/components/input-feedback';
import SharedIconMixin from '../mixins/ui-shared-icons';


export default Ember.Component.extend(SharedIconMixin,{
  layout: layout,
  tagName: 'span',
  classNames: ['form-control-feedback'],
  classNameBindings: ['_status'],
  attributeBindings: ['aria:aria-hidden'],
  aria: 'true',
  status: null,
  _status: Ember.on('didInsertElement', Ember.computed('status','iconFamily', function() {
    let status = this.get('status');
    let iconFamily = this.get('iconFamily');
    let iconMapper = {
      ok: { fa: 'ok', glyphicon: 'ok'},
      warning: { fa: 'exclamation', glyphicon: 'exclamation-sign'},
      error: { fa: 'remove', glyphicon: 'remove'},
      success: { fa: 'check', glyphicon: 'ok'}
    };
    try {
      return this.getIconClass(iconMapper[status][iconFamily], iconFamily);
    } catch (e) {
      return '';
    }
  }))
});
