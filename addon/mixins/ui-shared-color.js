import Ember from 'ember';

export default Ember.Mixin.create({
  
  classNameBindings: ['_colorClass'],

  color: 'default', // can be a "class", null, or an explicit style value
  _colorClass: Ember.on('init', Ember.computed('color','style', function() {
    let validStyles = Ember.A([
      'default','success','primary','info','warning','error'
    ]);
    let style = this.get('style');
    let color = this.get('color');
    let prefixed = color === 'none' ? style : `input-${color}`;
    
    if(validStyles.contains(color)) {
      return prefixed;      
    }
    
    return null;
  })),  
  _colorStyle: Ember.on('init', Ember.computed('color', function() {
    return 'red'; 
  }))
  
  
});
