import Ember from 'ember';

var IconSupport = Ember.Mixin.create({
  icon: null,
  _iconClass: Ember.on('didInsertElement', Ember.computed('icon','iconFamily', function() {
    let icon = this.get('icon');
    let iconFamily = this.get('iconFamily');
    
    return this.getIconClass(icon,iconFamily);
  })),
  getIconClass: function(icon, iconFamily) {
    let fixedWithClassMap = {
      fa: 'fw',
      glyphicon: ''
    };
    let fixedWith = this.get('_iconFixedWidth') ? fixedWithClassMap[iconFamily] : '';
    return icon ? `${iconFamily} ${fixedWith} ${iconFamily}-${icon}` : '';
  },
  
  // all icon types must come from a icon family like Glyphicons or Font Awesome
  iconFamily: 'fa',
  /**
   * If there is a parent container with size info (containedBy.size) then bring it across to this dependant node
   */
  _iconFamilyFromContainer: Ember.on('didInsertElement', Ember.observer('iconFamily','containedBy', 'containedBy.iconFamily', function() {
    let containedBy = this.get('containedBy');
    try {
      if(containedBy && Ember.typeOf(containedBy) === 'instance' && Ember.typeOf(containedBy.iconFamily) !== 'undefined') {
        this.set('iconFamily', containedBy.iconFamily);
      }
    } catch (e) {
      console.log('%s: failed attempt to attach to container\'s size', this.get('elementId'));
    }
  })),
  iconFamilyObserver: Ember.observer('iconFamily', function() {
    let validFamilies = Ember.A([ 'fa','glyphicon' ]);
    let iconFamily = this.get('iconFamily');
    if(!validFamilies.contains(iconFamily)) {
      console.warn(`Unknown iconFamily "${iconFamily}"`);
    }
  }),
  // icons can be specified as being fixed-width although right now only 
  // Font Awesome seems to make this distinction
  _iconFixedWidth: true,

  // Setup defaults based on ENV config
  _iconConfigurator: Ember.on('didInsertElement', function() {
    
  })
});

IconSupport[Ember.NAME_KEY] = 'Icon Support';
export default IconSupport; 