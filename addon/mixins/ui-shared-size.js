import Ember from 'ember';

export default Ember.Mixin.create({
  
  classNameBindings: ['_sizeClass','length:size'],
  attributeBindings: ['length:size'],

  length: null,
  size: 'default',
  _sizeClass: Ember.computed('size','style', function() {
    let bootstrapMap = {
      tiny: 'input-xs',
      small: 'input-sm',
      normal: null,
      default: null,
      large: 'input-lg',
      huge: 'input-hg'
    };
    let { size,style } = this.getProperties('size','style');
    if(style === 'bootstrap') {
      return bootstrapMap[size];
    } else {
      return `input-${size}`;
    }
  }),
  width: null,
  _widthStyle: Ember.computed('width', function() {
    let width = this.get('width');
    return width ? `width: ${width};` : null;
  }),
  
  // NOTE: the HTML5 spec has a different intent for 'size' but symantically it is really 'length' 
  // so remapping back to that nominclature. Also 'width' as a direct property on the INPUT element 
  // is only for images and not very useful ... instead width will be mapped to the Style property.
  _propertyRemapping: Ember.on('init', function() {
    Ember.A(this.get('attributeBindings')).removeObject('size');
    Ember.A(this.get('attributeBindings')).removeObject('width');
  }),
  
  
});
