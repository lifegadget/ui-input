/*jshint unused:false*/
import Ember from 'ember';

var SharedNumericRules = Ember.Mixin.create({
  _rulesTypeLibrary: [
    // Numeric 
    [ 
      'numeric', 
      {
        events: ['keyDown'],
        rule: function(context, eventType, event) {
          let result = { animate: false, sound: true };
          let keyCode = event.keyCode;
          let validControlCodes = Ember.A(context.get('_KEYBOARD.controlKeys'));
          let numericKeys = Ember.A(context.get('_KEYBOARD.numericKeys'));
          let decimalPlace = Ember.A(context.get('_KEYBOARD.decimalPlace'));
          let keyCombos = Ember.A(context.get('_KEYBOARD.keyCombos'));
          if(Ember.A(numericKeys.concat(validControlCodes).concat(decimalPlace)).contains(keyCode) || keyCombos(event)) {
            if(keyCombos(event) && keyCode === 86) {
              // Ensure clipboard content is number
              var contentBefore = context.get('value');
              context.$().on('paste',function(e) {
                e.preventDefault();
                var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
                if (! isNaN(Number(text)) ) {
                  context.set('value',Number(text));
                } else {
                  // console.log('re-instating context: %s', contentBefore);
                  context.set('value',contentBefore);
                  result.message = ['Attempt to paste non-numeric content was blocked.', {expiry: 2000, type: 'info'}];
                }
                context.$().off('paste');
              });
            }
            return result;
          } else {
            result.cancel = true;
            result.message = ['Only numeric characters are allowed.', {expiry: 2000, type: 'warning'}];
            return result;
          }
        } // end rule()
      } 
    ],
    // Integer 
    [ 
      'integer',
      {
        events: ['keyDown'],
        rule: function(context, eventType, event) {
          let result = {};
          let keyCode = event.keyCode;
          let validControlCodes = context.get('_KEYBOARD.controlKeys');
          let numericKeys = context.get('_KEYBOARD.numericKeys');
          let keyCombos = context.get('_KEYBOARD.keyCombos');
          if(Ember.A(numericKeys.concat(validControlCodes)).contains(keyCode) || keyCombos(event)) {
            if(keyCombos(event) && keyCode === 86) {
              // Ensure clipboard content is number
              var contentBefore = context.get('value');
              context.$().on('paste',function(e) {
                e.preventDefault();
                var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
                if (!isNaN(Number(text))) {
                  if (Number(text) % 1 === 0) {
                    context.set('value',Number(text));									
                  } else {
                    // strip off the non integer component
                    context.set('value',Math.floor(Number(text)));
                    context.addMessageQueue('Value pasted was numeric but not an integer. Only integer component kept.', {expiry: 2000, type: 'info'});
                  }
								
                } else {
                  context.set('value',contentBefore);
                  context.addMessageQueue('Attempt to paste non-numeric content was blocked.', {expiry: 2000, type: 'info'});
                }
                context.$().off('paste');
              });
            }
            return result;
          } else {
            result = { animate: true, sound: true, cancel: true };
            context.message = ['Only numeric characters are allowed.', {expiry: 2000, type: 'warning'}];
            return result;
          }
        } // end rule()
      }
    ], // end Map element
    [
      'min',
      {
        events: ['focusOut'],
        defaultAnimation: 'tada',
        defaultSound: null,
        rule: function(context, eventType, event) {
          let min = Number(context.get('min'));
          let value = Number(context.get('value'));
          let result = {};
          if(min !== null && value < min) {
            context.set('value',min);
            result.animate = true;
            result.sound = true;
            result.message = [`Minimum value of ${context.get('min')} was surpassed, resetting to minimum.`, {expiry: 2000, type: 'warning'}];
            return result;
          } else {
            return result;
          }

        } // end rule()
      }
    ], // end Map Element
    [
      'max',
      {
        events: ['focusOut'],
        defaults: new Map([
          ['animate','bounce']
        ]),
        rule: function(context, eventType, event) {
          let result = false;
          let max = Number(context.get('max'));
          let value = Number(context.get('value'));
          if(max !== null && value > max) {
            context.set('value',max);
            result = {
              trigger: true,
              cancel: false,
              message: [`Maximum value of ${context.get('max')} was surpassed, resetting to maximum.`, {expiry: 2000, type: 'warning'}]
            };
          } 
          return result;
        } // end rule()
      }
    ], // end Map Element
    [
      'minStretch',
      {
        events: ['focusOut'],
        defaultAnimation: 'rubberBand',
        defaultSound: null,
        rule: function(context, eventType, event) {
          let result = {};
          let min = Number(context.get('min'));
          let value = Number(context.get('value'));
          if(min !== null && value < min) {
            result.animate = true;
            result.sound = true;
            result.message = [`Minimum was exceeded, new minimum set from ${value} to ${min}`, {expiry: 2000, type: 'warning'}];
            context.set('min',value);
            return result;
          } else {
            return result;
          }

        } // end rule()
      }
    ], // end Map Element
    [
      'maxStretch',
      {
        events: ['focusOut'],
        defaultAnimation: 'rubberBand',
        defaultSound: null,
        rule: function(context, eventType, event) {
          let result = {};
          let max = Number(context.get('max'));
          let value = Number(context.get('value'));
          if(max !== null && value > max) {
            result.animate = true;
            result.sound = true;
            result.message = [`Maximum was exceeded, new maximum changed from ${value} to ${max}`, {expiry: 2000, type: 'warning'}];
            context.set('max',value);
            return result;
          } else {
            return result;
          }

        } // end rule()
      }
    ], // end Map Element
    [
      'stepUp',
      {
        events: ['focusOut'],
        defaultAnimation: 'bounce',
        defaultSound: null,
        rule: function(context, eventType, event) {
          let result = {};
          var step = Number(context.get('step'));
          var value = Number(context.get('value')) || 0;
          var max = Number(context.get('max'));
          var modulus = value % step;
          if(step !== null && modulus !== 0) {
            if(max && value + (step - modulus) > max) {
              // Can not step UP if that violates max amount
              context.set('value', value - modulus);
              context.addMessageQueue('Value must be a multiple of %@ while maintaining a maximum of %@; upjusted value from %@ to %@.'.fmt(step,max,value,context.get('value')), {expiry: 2000, type: 'warning'});
            } else {
              // Step up
              result = {
                animate: true,
                sound: true,
                message: [`Value must be a multiple of ${step}, upjusted value from ${value} to ${context.get('value')}.`, {expiry: 2000, type: 'warning'}]
              };
              context.set('value', value + (step - modulus));
            }
          }

          return result;
        } // end rule()
      }
    ], // end Map Element
    [
      'stepDown',
      {
        events: ['focusOut'],
        defaultAnimation: 'bounce',
        defaultSound: null,
        rule: function(context, eventType, event) {
          let result = {};
          var step = Number(context.get('step'));
          var value = Number(context.get('value')) || 0;
          var min = Number(context.get('min'));
          var modulus = value % step;
          if(step !== null && modulus !== 0) {
            result = {
              animate: true,
              sound: true,
            };
            // Can not step DOWN if that violates min amount
            if(min && (value - modulus) < min) {
              result.message = [`Value must be a multiple of ${step} while maintaining a minimum of ${min}; upjusted value from ${value} to ${context.get('value')}.`, {expiry: 2000, type: 'warning'}];
              context.set('value', value + (step - modulus));
            } else {
              // Step down
              result.message = [`Value must be a multiple of ${step}, upjusted value from ${value} to ${context.get('value')}.`, {expiry: 2000, type: 'warning'}];
              context.set('value', value - modulus);
            }
          }

          return result;
        } // end rule()
      }
    ], // end Map Element
  ]
  
});


SharedNumericRules[Ember.NAME_KEY] = 'Shared Numeric Rules';
export default SharedNumericRules; 