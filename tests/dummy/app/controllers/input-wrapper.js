import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [ 'prefixText', 'postfixText', 'prefixIcon', 'postfixIcon' ],

  prefixText: '',
  postfixText: '.00',
  prefixIcon: 'phone',
  postfixIcon: null,
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
  ]

});