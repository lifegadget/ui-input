import Ember from 'ember';

var SizingSupport =  Ember.Mixin.create({
  
  classNameBindings: ['_sizeClass','length:size'],
  attributeBindings: ['length:size'],

  length: null,
  _lengthObserver: Ember.observer('length', function() {
    if(this.get('length') === '') {
      this.set('length', null);
    }
  }),
  size: 'default',
  /**
   * If there is a parent container with size info (containedBy.size) then bring it across to this dependant node
   */
  _sizeFromContainer: Ember.on('didInsertElement', Ember.observer('size','containedBy', 'containedBy.size', function() {
    let { size, containedBy } = this.getProperties('size','containedBy');
    try {
      if(containedBy && Ember.typeOf(containedBy) === 'instance') {
        this.set('size', containedBy.size);
      }
    } catch (e) {
      console.log('%s: failed attempt to attach to container\'s size', this.get('elementId'));
    }
  })),
  _sizeClass: Ember.computed('size','style', function() {
    let groupy = this.get('tagName') === 'input' ? '' : '-group';
    let sizeMap = {
      tiny: 'xs',
      xs: 'xs',
      small: 'sm',
      sm: 'sm',
      normal: null,
      default: null,
      large: 'lg',
      lg: 'lg',
      huge: 'hg',
      hg: 'hg'
    };
    let size = this.get('size');
    if(!size) {
      return '';
    } else {
      size = sizeMap[size];
    }
    return `input${groupy}-${size}`;
  }),
  width: null,
  _widthStyle: Ember.computed('width', function() {
    let width = this.get('width');
    return width ? `width: ${width};` : null;
  }),
  
  // NOTE: the HTML5 spec has a different intent for 'size' but symantically it is really 'length' 
  // so remapping back to that nominclature. Also 'width' as a direct property on the INPUT element 
  // is only for images and not very useful ... instead width will be mapped in to the Style property.
  _propertyRemapping: Ember.on('init', function() {
    Ember.A(this.get('attributeBindings')).removeObject('size');
    Ember.A(this.get('attributeBindings')).removeObject('width');
  })  
});

SizingSupport[Ember.NAME_KEY] = 'Sizing Support';
export default SizingSupport; 
