import Ember from 'ember';

export default Ember.Mixin.create({
  
  classNameBindings: ['_statusClass'],

  status: null, 
  /**
   * If there is a parent container with size info (containedBy.size) then bring it across to this dependant node
   */
  _statusFromContainer: Ember.on('didInsertElement', Ember.observer('status','containedBy', 'containedBy.status', function() {
    let containedBy  = this.get('containedBy');
    try {
      if(containedBy && Ember.typeOf(containedBy) === 'instance') {
        this.set('status', containedBy.status);
      }
    } catch (e) {
      console.log('%s: failed attempt to attach to container\'s status', this.get('elementId'));
    }
  })),
  _statusClass: Ember.on('init', Ember.computed('color','style','status', function() {
    let validStatus = Ember.A([
      'success','info','warning','error'
    ]);
    let status = this.get('status');
    
    return validStatus.contains(status) ? `status-${status}` : null;
  }))
  
});
