module.exports = {
	description: 'Input controls for ambitious Ember applications',
	
	normalizeEntityName: function() {
		// this prevents an error when the entityName is
		// not specified (since that doesn't actually matter
		// to us
	},
  
  // afterInstall: function() {
  //     return this.addBowerPackagesToProject([
  //       { name: 'fontawesome', target: '4.3.0' },
  //       { name: 'animate.css', target: '3.2.6' }
  //     ]);
  // }
};
