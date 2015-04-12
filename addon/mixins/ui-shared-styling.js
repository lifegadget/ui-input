import Ember from 'ember';

var StyleSupport = Ember.Mixin.create({
  
  classNameBindings: ['_formControl:form-control','style','_inputInliner:input-inliner'],
  attributeBindings: ['_styles:style'],
  
  // "style" refers to the family of styling that should be applied via class definitions
  style: 'bootstrap',
  _formControl: Ember.on('init', Ember.computed('style', function() {
    let style = this.get('style');
    return style === 'bootstrap' ? true : false;
  })),
  // by default a control is of type "block" but in some situations it will be set to inline using a class
  _inputInliner: false,
  
  width: null,
  height: null,
  // "_styles" maps directly back to the HTML style property
  _styles: Ember.on('didInsertElement', Ember.computed('_styles', 'width', 'height', 'textColor','backgroundColor','borderColor','outlineColor', function() {
    let { width, height, textColor, backgroundColor, borderColor, outlineColor } = this.getProperties('width', 'height', 'textColor','backgroundColor','borderColor','outlineColor');
    let style = '';
    style = width ? style + `width:${width};` : style;
    if(height === 'auto' || height === 'width') {
      height = this.$().innerWidth() + 'px';
    }
    style = height ? style + `height:${height};` : style;
    if(width || height) {
      this.set('_inputInliner',true);
    } else {
      this.set('_inputInliner',false);
    }
    style = textColor ? style + `color:${textColor};` : style;
    style = backgroundColor ? style + `background-color:${backgroundColor};` : style;
    style = borderColor ? style + `border-color:${borderColor};` : style;
    style = outlineColor ? style + `outline-color:${outlineColor};` : style;
    style = style ? Ember.String.htmlSafe(style) : null;
    
    return style;
  })),

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
    let { icon, family, prefix, icon } = this.getProperties('icon','_iconFamily','_iconPrefix');
    if(icon) {
      icon = `${family} ${prefix}${icon}`;
      return icon;
    }
  
    return null;
  })

});

StyleSupport[Ember.NAME_KEY] = 'Style Support';
export default StyleSupport; 