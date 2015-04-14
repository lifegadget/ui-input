import Ember from 'ember';
/*jshint unused:false*/

var SoundEffectSupport = Ember.Mixin.create({
  classNameBindings: ['_animateClass'],

  sound: null,
  _soundPlayer: Ember.observer('sound', function() {
    let sound = this.get('sound');
    if(sound) {
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

SoundEffectSupport[Ember.NAME_KEY] = 'Sound Effects';
export default SoundEffectSupport; 