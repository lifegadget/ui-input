import Ember from 'ember';

var AnimationSupport = Ember.Mixin.create({
  classNameBindings: ['_animateClass'],

  animate: null,
  _animator: Ember.observer('animate', function() {
    let animate = this.get('animate');
    if(animate) {
      this._processAnimation(animate);
    }
  }),
  animateEnabled: null,
  animateDisabled: null,
  _disabledObserver: Ember.observer('disabled','animateEnabled', 'animateDisabled', function() {
    let { disabled, animateEnabled, animateDisabled } = this.getProperties('disabled', 'animateEnabled', 'animateDisabled');
    if(disabled && animateDisabled) {
      this._processAnimation(animateDisabled);
    }
    if(!disabled && animateEnabled) {
      this._processAnimation(animateEnabled);
    }
  }),
  animateEnter: null,
  _enterAnimationObserver: Ember.on('didRender', function() {
    let animateEnter = this.get('animateEnter');
    if(animateEnter) {
      this._processAnimation(animateEnter);
    }
  }),
  _processAnimation: function(animate) {
    let defaultAnimation = 'pulse';
    animate = animate === true ? defaultAnimation : animate;

    this.$().addClass(`animated ${animate}`);
    this.$().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
      this.$().removeClass('animated ' + animate);
      this.set('animate', null);
    });
  },
  // other animation events (which are trigged in base object)
  animateMouseEnter: null,
  animateMouseLeave: null,
  animateMouseDown: null,
  animateFocusIn: null,
  animateFocusOut: null,
  animateChange: null,
  animateInput: null,
  animateSubmit: null
});

AnimationSupport[Ember.NAME_KEY] = 'Animation Support';
export default AnimationSupport;
