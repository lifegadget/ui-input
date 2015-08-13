import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const {computed, observer, $, A, run, on, typeOf, debug, defineProperty, get, set, inject, isEmpty} = Ember;  // jshint ignore:line
const htmlSafe = Ember.String.htmlSafe;
const dasherize = Ember.String.dasherize;
const _styleProperties = ['maxWidth', 'width', 'minWidth','height','fontSize','fontFamily','fontWeight','fontStyle','color','backgroundColor','borderColor','outlineColor','zIndex','opacity'];
const _attributeUnbinding = ['style'];
const GOLDEN_RATIO = 1.618;
const ASPECT_RATIO = 1.3;

var StyleSupport = Ember.Mixin.create({
  classNameBindings: ['_textAlignClass'],

  // STYLE PROPERTY
  // "skin" refers to the family of styling that should be applied via class definitions
  skin: computed('group.skin', {
    set(_,value) {
      this.set('_skin', value);
      return value;
    },
    get() {
      const groupSkin=this.get('group.skin');
      const localSkin=this.get('_skin');
      let skin = localSkin ? localSkin : groupSkin;

      return skin ? skin : 'bootstrap';
    }
  }),
  _formControl: Ember.computed('skin', function() {
    let skin = this.get('skin');
    return skin === 'bootstrap' ? true : false;
  }),
  // by default a control is of type "block" but in some situations it will be set to inline using a class
  // TODO: remove this
  _inputInliner: false,

  // HTML STYLE PROPS
  _propertyUnset: _attributeUnbinding,
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
  _attributeRemapping: on('init', function() {
    const props =_attributeUnbinding;
    props.map( prop => {
      new A(this.get('attributeBindings')).removeObject(prop);
    });
  }),

  // ICONS
  // all icon types must come from same font family
  _iconFamily: computed('iconFamily', 'group.iconFamily', function() {
    const localIconFamily = this.get('iconFamily');
    const groupIconFamily = this.get('group.iconFamily');
    let iconFamily = groupIconFamily ? groupIconFamily : localIconFamily;

    return iconFamily ? iconFamily : 'fa';
  }),
  _iconPrefix: Ember.computed('_iconFamily', function() {
    return this.get('_iconFamily') === 'fa' ? 'fa-' : 'glyphicon-';
  }),
  icon: computed('group.prefixIcon', 'group.icon', 'group.postfixIcon', {
    set(_,value) {
      return value;
    },
    get() {
      // const prefixIcon = this.get('group.prefixIcon');
      // const postfixIcon = this.get('group.postfixIcon');
      const groupIcon = this.get('group.icon');
      // TODO: look into the best logic for this WRT to inline format
      return groupIcon;
    }
  }),
  _iconClass: Ember.computed('_iconFamily','_iconPrefix','icon', function() {
    let { icon, _iconFamily, _iconPrefix } = this.getProperties('icon','_iconFamily','_iconPrefix');
    if(icon) {
      icon = `${_iconFamily} ${_iconPrefix}${icon}`;
      return icon;
    }

    return null;
  }),

  // TEXT ALIGNMENT
  textAlign: 'left',
  _textAlignClass: Ember.computed('textAlign','group.textAlign', function() {
    let alignment = this.get('textAlign');
    let groupAlignment = this.get('group.textAlign');

    return groupAlignment ? `text-align-${groupAlignment}` : `text-align-${alignment}`;
  })

});

StyleSupport[Ember.NAME_KEY] = 'Style Support';
export default StyleSupport;
