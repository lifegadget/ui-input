import Ember from 'ember';

export default Ember.Mixin.create({
  
  classNameBindings: ['_statusClass'],

  status: null, 
  _statusClass: Ember.on('init', Ember.computed('color','style','status', function() {
    let validStatus = Ember.A([
      'success','info','warning','error'
    ]);
    let status = this.get('status');
    
    return validStatus.contains(status) ? `status-${status}` : null;
  }))
  
});
