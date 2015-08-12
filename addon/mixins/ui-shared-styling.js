import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const {computed, observer, $, A, run, on, typeOf, debug, defineProperty, get, set, inject, isEmpty} = Ember;  // jshint ignore:line
const htmlSafe = Ember.String.htmlSafe;
const dasherize = Ember.String.dasherize;
const _styleProperties = ['maxWidth', 'width', 'minWidth','height','fontSize','fontFamily','fontWeight','fontStyle','color','backgroundColor','borderColor','outlineColor'];
const GOLDEN_RATIO = 1.618;
const ASPECT_RATIO = 1.3;

var StyleSupport = Ember.Mixin.create({
  // STYLE PROPERTY
  // "style" refers to the family of styling that should be applied via class definitions
  style: 'bootstrap',
  _formControl: Ember.on('init', Ember.computed('style', function() {
    let style = this.get('style');
    return style === 'bootstrap' ? true : false;
  })),
  // by default a control is of type "block" but in some situations it will be set to inline using a class
  _inputInliner: false,

  // HTML STYLE PROPS
  _propertyUnset: _styleProperties,
  _style: computed(..._styleProperties, function() {
    const styles = this.getProperties(..._styleProperties);
    const sizer = size => {
      return Number(size) === size ? size + 'px' : size;
    };

    const stylist = (style, value) => {
      switch(style) {
        case 'fontSize':
        case 'width':
        case 'minWidth':
        case 'maxWidth':
        return sizer(value);
        case 'height':
        let width = this.get('width');
        if(!width || String(width).substr(-2) !== 'px') {
          return sizer(value);
        }
        width = width.substr(0,width.length - 2);
        if(value === 'golden') {
         return width / GOLDEN_RATIO + 'px';
        } else if (value === 'square' && this.get('width')) {
          return width / ASPECT_RATIO + 'px';
        } else {
          return sizer(value);
        }
        return value;
        default:
        return value;
      }
    };
    return htmlSafe(keys(styles).filter( key => {
      return styles[key];
    }).map( key => {
      return dasherize(key) + ': ' + stylist(key, get(this,key));
    }).join('; '));
  }),
  _propertyRemapping: on('init', function() {
    const props = new A(this.get('_propertyUnset'));
    props.forEach( prop => {
      new A(this.get('attributeBindings')).removeObject(prop);
    });
  }),

  // ICONS
  // all icon types must come from same font family
  _iconFamily: 'fa',
  _iconPrefix: Ember.computed('_iconFamily', function() {
    return this.get('_iconFamily') === 'fa' ? 'fa-' : 'glyphicon-';
  }),
  // icon types are: prefix, postfix, status,
  // note: the name "icon" is an alias for a prefix icon
  icon: Ember.computed.alias('iconPrefix'),
  prefixIcon: null,
  _iconClass: Ember.computed('_iconFamily','_iconPrefix','icon', function() {
    let { icon, family, prefix } = this.getProperties('icon','_iconFamily','_iconPrefix');
    if(icon) {
      icon = `${family} ${prefix}${icon}`;
      return icon;
    }

    return null;
  })

});

StyleSupport[Ember.NAME_KEY] = 'Style Support';
export default StyleSupport;
