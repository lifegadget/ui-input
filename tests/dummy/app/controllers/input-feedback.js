import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [ 'groupStatus', 'feedbackStatus', 'size', 'style' ],

  prefixText: '',
  postfixText: '.00',
  prefixIcon: 'phone',
  postfixIcon: null,
  prefixCheckbox: true,
  size: 'large',
  style: 'bootstrap',
  iconFamilies: [
		{id: 'fa', name: 'Font Awesome', sidecar: 'foo'},
		{id: 'glyphicon', name: 'Glyphicons', sidecar: 'bar'}
  ],
  sizes: [
		{id: 'tiny', name: 'tiny'},
		{id: 'small', name: 'small'},
		{id: null, name: 'default'},
		{id: 'large', name: 'large'},
		{id: 'huge', name: 'huge'}
  ],
  groupStatuses: [
		{id: null, name: 'None'},
		{id: 'error', name: 'Error'},
		{id: 'warning', name: 'Warning'},
		{id: 'success', name: 'Success'}
  ] ,
  groupStatus: 'error',
  feedbackStatus: 'error'

});