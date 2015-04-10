import Ember from 'ember';

export default Ember.Mixin.create({
  
  classNameBindings: ['_formControl:form-control','style'],
  attributeBindings: ['_styles:style'],
  
  // "style" refers to the family of styling that should be applied via class definitions
  style: 'bootstrap',
  _formControl: Ember.on('init', Ember.computed('style', function() {
    let style = this.get('style');
    return style === 'bootstrap' ? true : false;
  })),
  
  // "_styles" maps directly back to the HTML style property
  _styles: Ember.on('init', Ember.computed('_styles', 'width', 'height', '_colorStyle', function() {
    let { width, height, color } = this.getProperties('width', 'height', '_colorStyle');
    let style = '';
    style = width ? style + `width:${width};` : style;
    style = height ? style + `height:${height};` : style;
    style = width || height ? style + 'display: inline-block;' : style;
    style = color ? style + color : style;
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
      return icon      
    }
    
    return null;
  })
  
});
