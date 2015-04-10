import Ember from 'ember';

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var isEmpty = Ember.isEmpty;
var typeOf = Ember.typeOf;

export default Ember.Mixin.create({
  processCorrections: function(eventType, evt, options) {
    options = options || {};
    var self = this;
    var _activeCorrections = Ember.A(this.get('_activeCorrections')).filterBy('event',eventType);
    var isAcceptable = true; // whitelist
    _activeCorrections.forEach(function(correction) {
      // console.log('[%s] processing %s: %o', self.get('elementId'), eventType, correction);
      var thisRule = correction.rule(self, evt);
      isAcceptable = isAcceptable ? thisRule : false;
      if(!thisRule) {
        self.emphasize(correction.emphasis);
      }
    });
    if(!isAcceptable) {
      evt.preventDefault();
    }
    return isAcceptable;
  },
  // CORRECTION RULES
  correctionRules: [], // opportunity for user of component to add rules (bespoke or internal)
  ignoreDefaultRules: false, // opportunity for user of component to turn off defaults
  _activeCorrections: [],	// active rules
  _addCorrectionRules: Ember.observer( 'correctionRules' , function() {
    var self = this;
    var adding = Ember.A(self.get('correctionRules') || []);
    var defaultCorrectionRules = self.get('defaultCorrectionRules');
    var _activeCorrections = self.get('_activeCorrections');
    adding = typeOf(adding) === 'string' ? adding.split(',') : adding;
    // since integerOnly is superset of numericOnly and clipboard functionality is tricky with both in place
    // we will remove "numericOnly" if "intergerOnly" exists ... TODO: find a more graceful way of handling this
    if(adding.contains('integerOnly')) {
      defaultCorrectionRules.remove(defaultCorrectionRules.indexOf('numericOnly'));
      self.set('defaultCorrectionRules',defaultCorrectionRules);
    }
    if(!isEmpty(defaultCorrectionRules)) {
      adding = adding.concat(defaultCorrectionRules);
    }
    adding.forEach(function(correction) {
      // correction is either an object which means it's really an external rule definition
      // or its a string which is a reference to the internal rules
      if(typeOf(correction) === 'string') {
        // INTERNAL RULE
        var libraryItem = Ember.A(self.get('_correctionLibrary')).findBy('id',correction);
        if(isEmpty(libraryItem)) {
          console.warn('Couldn\'t find correction rule "%s"', correction);
        } else {
          self.set('_activeCorrections', self.get('_activeCorrections').concat(libraryItem));
        }
      } else if(typeOf(correction) === 'object'){
        // EXTERNAL RULE
        if(isEmpty(correction.id)) {
          console.warn('External correction rule does not have an ID. Ignoring. %o', correction);
        } else if(isEmpty(correction.rule) || typeOf(correction.rule) !== 'function') {
          console.warn('Correction rule "%s" is missing its rule definition!', correction.id);						
        } else if(isEmpty(correction.event)) {
          console.warn('Correction rule "%s" is missing an event definition.', correction.id);						
        } else {
          // Looks like external rule is correctly formatted
          self.set('_activeCorrections', _activeCorrections.addObject(correction));
        }
      } else {
        // UNKNOWN
        console.warn('Correction rule "%s" is not formatted correctly', correction);
      }
    });
  }),
  _correctionInit: Ember.on('didInsertElement', function() {
    this._addCorrectionRules();
  }),
  _correctionLibrary: [
    {
      id:'numericOnly',
      event: 'keyDown',
      emphasis: null,
      rule: function(context,event) {
        var keyCode = event.keyCode;
        var validControlCodes = Ember.A(context.get('_KEYBOARD.controlKeys'));
        var numericKeys = Ember.A(context.get('_KEYBOARD.numericKeys'));
        var decimalPlace = Ember.A(context.get('_KEYBOARD.decimalPlace'));
        var keyCombos = Ember.A(context.get('_KEYBOARD.keyCombos'));
        if(numericKeys.concat(validControlCodes).concat(decimalPlace).contains(keyCode) || keyCombos(event)) {
          if(keyCombos(event) && keyCode === 86) {
            // Ensure clipboard content is number
            var contentBefore = context.get('value');
            context.$().on('paste',function(e) {
              e.preventDefault();
              var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
              if (! isNaN(Number(text)) ) {
                context.set('value',Number(text));
              } else {
                console.log('re-instating context: %s', contentBefore);
                context.set('value',contentBefore);
                context.addMessageQueue('Attempt to paste non-numeric content was blocked.', {expiry: 2000, type: 'info'});
              }
              context.$().off('paste');
            });
          }
          return true;
        } else {
          context.addMessageQueue('Only numeric characters are allowed.', {expiry: 2000, type: 'warning'});
          return false;
        }
      } 
    },
    {
      id:'integerOnly',
      event: 'keyDown',
      emphasis: null,
      rule: function(context,event) {
        var keyCode = event.keyCode;
        var validControlCodes = context.get('_KEYBOARD.controlKeys');
        var numericKeys = context.get('_KEYBOARD.numericKeys');
        var keyCombos = context.get('_KEYBOARD.keyCombos');
        if(numericKeys.concat(validControlCodes).contains(keyCode) || keyCombos(event)) {
          if(keyCombos(event) && keyCode === 86) {
            // Ensure clipboard content is number
            var contentBefore = context.get('value');
            context.$().on('paste',function(e) {
              e.preventDefault();
              var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
              if (Number(text) !== NaN ) {
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
          return true;
        } else {
          context.addMessageQueue('Only numeric characters are allowed.', {expiry: 2000, type: 'warning'});
          return false;
        }
      } 
    },
    {
      // Redefine min when no lower-than-min value comes in
      id:'stretchMin',
      event: 'focusOut',
      emphasis: 'pulse',
      rule: function(context,event) {
        var min = Number(context.get('min'));
        var value = Number(context.get('value'));
        if(min !== null && value < min) {
          context.set('min',value);
          context.addMessageQueue(`Minimum was exceeded, new minimum set from ${min} to ${value}.`, {expiry: 2000, type: 'warning'});
          return false;
        } else {
          return true;
        }
      } 
    },		
    {
      id:'min',
      event: 'focusOut',
      emphasis: 'shake',
      rule: function(context,event) {
        var min = Number(context.get('min'));
        var value = Number(context.get('value'));
        if(min !== null && value < min) {
          context.set('value',min);
          context.addMessageQueue(`Minimum value of ${min} was surpassed, resetting to minimum.`, {expiry: 2000, type: 'warning'});
          return false;
        } else {
          return true;
        }
      } 
    },
    {
      // Redefine max when no higher-than-max value comes in
      id:'stretchMax',
      event: 'focusOut',
      emphasis: 'pulse',
      rule: function(context,event) {
        var max = Number(context.get('max'));
        var value = Number(context.get('value'));
        if(max !== null && value > max) {
          context.set('max',value);
          context.addMessageQueue(`Maximum was exceeded, new maximum set from ${max} to ${value}.`, {expiry: 2000, type: 'warning'});
          return false;
        } else {
          return true;
        }
      } 
    },
    {
      id:'max',
      event: 'focusOut',
      emphasis: 'shake',
      rule: function(context,event) {
        var max = Number(context.get('max'));
        var value = Number(context.get('value'));
        if(max !== null && value > max) {
          context.set('value',max);
          context.addMessageQueue(`Maximum value of ${max} was surpassed, resetting to maximum.`, {expiry: 2000, type: 'warning'});
          return false;
        } else {
          return true;
        }
      } 
    },
    {
      id:'stepUp',
      event: 'focusOut',
      emphasis: 'bounce',
      rule: function(context,event) {
        var step = Number(context.get('step'));
        var value = Number(context.get('value')) || 0;
        var max = Number(context.get('max'));
        var modulus = value % step;
        if(step !== null && modulus !== 0) {
          if(max && value + (step - modulus) > max) {
            // Can not step UP if that violates max amount
            context.set('value', value - modulus);
            context.addMessageQueue(`Value must be a multiple of ${step} while maintaining a maximum of ${max}; upjusted value from ${value} to ${context.get('value')}.`, {expiry: 2000, type: 'warning'});
          } else {
            // Step up
            context.set('value', value + (step - modulus));
            context.addMessageQueue(`Value must be a multiple of ${step}, upjusted value from ${value} to ${context.get('value')}.`, {expiry: 2000, type: 'warning'});
          }
          return false;
        } else {
          return true;
        }
      } 
    },
    {
      id:'stepDown',
      event: 'focusOut',
      emphasis: 'bounce',
      rule: function(context,event) {
        var step = Number(context.get('step'));
        var value = Number(context.get('value')) || 0;
        var min = Number(context.get('min'));
        var modulus = value % step;
        if(step !== null && modulus !== 0) {
          if(min && (value - modulus) < min) {
            // Can not step DOWN if that violates min amount
            context.set('value', value + (step - modulus));
            context.addMessageQueue(`Value must be a multiple of ${step} while maintaining a minimum of ${min}; upjusted value from ${value} to ${context.get('value')}.`, {expiry: 2000, type: 'warning'});
          } else {
            // Step up
            context.set('value', value - modulus);
            var message = `Value must be a multiple of ${step}, upjusted value from ${value} down to ${context.get('value')}.`;
            context.sendAction('correctionRule', message, context);
            context.addMessageQueue(message, {expiry: 2000, type: 'warning'});
          }
          return false;
        } else {
          return true;
        }
      } 
    },
  ],
  // REFERENCE VARIABLES
  _KEYBOARD: {
    controlKeys: [8,9,27,36,37,39,38,40,46], // 8:delete, 9:tab, 27: escape, 36:home, 37:left, 39:right, 38:up, 40:down, 46: backspace
    numericKeys: [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,187,189], // 48-57 are standard, 96-105 are numpad numeric keys, - and + symbols are 187/189
    modifierKeys: [16,17,18], // 16: shift, 17: cntrl, 18: alt
    decimalPlace: [190],
    // allows checking of key combinations; by default just checks 
    // for ctrl-A/cmd-A but options array allows setting what is allowed
    keyCombos: function(evt, options) {
      options = options || {};
      var isAcceptable = false;
      var config = [
        { id: 'ctrlKey', value: options.ctrlKey || [65,86] }, // ctrl-A, ctrl-v
        { id: 'shiftKey', value: options.shiftKey || [] },
        { id: 'metaKey', value: options.metaKey || [65,82,86] }, // 65: cmd/win-A, cmd/win-R, cmd-v
        { id: 'altKey', value: options.altKey || [] },
      ];
      config.forEach(function(item) {
        if (evt[item.id]) {
          if (item.value.contains(evt.keyCode)) {
            isAcceptable = true;
          }
        }
      });
			
      return isAcceptable;
    } 
  }
  
});
