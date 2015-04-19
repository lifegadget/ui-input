import Ember from 'ember';
/*jshint unused:false*/

var VibrationSupport = Ember.Mixin.create({
  
  vibrate: null,
  _vibrate: Ember.observer('vibrate', function() {
    let vibrate = this.get('vibrate');
    if(vibrate) {
      this.startVibration(vibrate);
    } else if (vibrate === false) {
      this.stopVibration(); // explicit stop on 'false'
      this.set('vibrate',null);
    }
  }),
  
  // wraps the Vibrate API
  startVibration: function(signal) {
    let timing = 0;
    if(window.navigator) {
      if(Ember.typeOf(signal) === 'string') {
        signal = signal.split(','); // allows for passing CSV values
      } else if(Ember.typeOf(signal) === 'number') {
        signal = [ signal ];
      }
      timing = signal.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      });
      window.navigator.vibrate(signal);
    }
    // reset vibration with an attempt to coincide that with completion of vibration signal
    Ember.run.later(this,() => {
      this.set('vibrate',null);       
    }, timing);
  },
  stopVibration: function() {
    if("vibrate" in window.navigator) {
      window.navigator.vibrate([]);
    }
  }

  // NOT IMPLEMENTED YET
});

VibrationSupport[Ember.NAME_KEY] = 'Vibration Effects';
export default VibrationSupport; 