import Ember from 'ember';

var IconSupport = Ember.Mixin.create({
  // icon types are: prefix, postfix, status, 
  // note: the name "icon" is an alias for a prefix icon
  icon: Ember.computed.alias('iconPrefix'),
  prefixIcon: null,
  postfixIcon: null,
  statusIcon: null,
  _prefixIcon: Ember.on('didInsertElement', Ember.computed('prefixIcon','iconFamily', function() {
    return this.getIconClass(this.get('prefixIcon'));
  })),
  _postfixIcon: Ember.on('didInsertElement', Ember.computed('postfixIcon','iconFamily', function() {
    return this.getIconClass(this.get('postfixIcon'));
  })),
  _statusIcon: Ember.on('didInsertElement', Ember.computed('postfixIcon','iconFamily', function() {
    return this.getIconClass(this.get('statusIcon'));
  })),
  

  // helper function to get appropriate classes
  getIconClass: function(icon) {
    let iconFamily = this.get('iconFamily');
    let fixedWithClassMap = {
      fa: 'fw',
      glyphicon: '',
    };
    let fixedWith = this.get('_iconFixedWidth') ? fixedWithClassMap[iconFamily] : '';
    return icon ? `${iconFamily} ${fixedWith} ${iconFamily}-${icon}` : false;
  },
  
  // all icon types must come from a icon family like Glyphicons or Font Awesome
  iconFamily: 'fa',
  // icons can be specified as being fixed-width although right now only 
  // Font Awesome seems to make this distinction
  _iconFixedWidth: true,

  // Setup defaults based on ENV config
  _iconConfigurator: Ember.on('didInsertElement', function() {
    
  })
});

IconSupport[Ember.NAME_KEY] = 'Icon Support';
export default IconSupport; 