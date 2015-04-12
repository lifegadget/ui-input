import Ember from 'ember';

var SoundEffectSupport = Ember.Mixin.create({
  classNameBindings: ['_animateClass'],

  sound: null,
  _soundPlayer: Ember.observer('sound', function() {
    let sound = this.get('sound');
    if(animate) {
      // this._processAnimation(animate);
    }
  }),
  soundEnabled: null,
  soundDisabled: null,
  _disabledSoundObserver: Ember.observer('disabled','soundEnabled', 'soundDisabled', function() {
    let { disabled, soundEnabled, soundDisabled } = this.getProperties('disabled', 'soundEnabled', 'soundDisabled');
 
  }),

  // other animation events (which are trigged in base object)
  soundMouseEnter: null,
  soundMouseLeave: null,
  soundMouseDown: null,
  soundFocusIn: null,
  soundFocusOut: null,
  soundChange: null,
  soundInput: null,
  soundSubmit: null
});

SoundEffectSupport[Ember.NAME_KEY] = 'sound-effects';
export default SoundEffectSupport; 