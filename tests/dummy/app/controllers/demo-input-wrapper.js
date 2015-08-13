import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [ 'prefixText', 'postfixText', 'prefixIcon', 'postfixIcon' ],

  prefixText: '',
  postfixText: '.00',
  prefixIcon: 'phone',
  postfixIcon: null,
  prefixCheckbox: true,
  size: 'large',
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
  prefixCheckboxValues: [
		{id: true, name: 'true'},
		{id: false, name: 'false'},
		{id: null, name: 'null'}  
  ],
  groupStatuses: [
		{id: null, name: 'None'},
		{id: 'error', name: 'Error'},
		{id: 'warning', name: 'Warning'},
		{id: 'success', name: 'Success'}
  ],
  

});