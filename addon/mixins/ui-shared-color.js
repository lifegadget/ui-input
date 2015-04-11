import Ember from 'ember';

export default Ember.Mixin.create({
  
  classNameBindings: ['_colorClass','_focusColorClass'],

  color: null, // can be a "class", null, or an explicit style value
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
  focusColor: null, // can be a "class", null, or an explicit style value
  _focusColorClass: Ember.on('init', Ember.computed('focusColor','style', function() {
    let validStyles = Ember.A([
      'default','success','primary','info','warning','error'
    ]);
    let style = this.get('style');
    let color = this.get('focusColor');
    let prefixed = color === 'none' ? style : `input-focused-${color}`;
    
    if(validStyles.contains(color)) {
      return prefixed;      
    }
    
    return null;
  })),  
  // Stylistic atomic color (picked up by shared-styling.js)
  textColor: null,
  backgroundColor: null,
  borderColor: null,
  outlineColor: null,
  
  
  
});
