import Ember from 'ember';

var SharedTextRules = Ember.Mixin.create({
  
  _rulesTextLibrary: [
    // Length Limit 
    [ 
      'lengthLimit', 
      {
        defaults: new Set([
          [ 'vibrate', [250,1000] ]
        ]),
        events: ['keyDown'],
        rule: function(context, eventType, event) {
          let valueLength = context.value.length;
          let limit = context.length;
          let keyCode = event.keyCode;
          let controlKeys = context.get('_KEYBOARD.controlKeys');
          // anticipate incoming keystroke effect on length
          if (Ember.A([46,8]).contains(keyCode)) {
            valueLength = valueLength - 1; // backspace, delete key
          } else if (!controlKeys.contains(keyCode)) {
            valueLength = valueLength + 1; // non control character adds to length
          }

          if(limit && valueLength > limit) {
            return {trigger: true, cancel: true};
          }
          return false;
        } // end rule()
      } 
    ],
    // Length Limit 
    [ 
      'lengthWarn', 
      {
        events: ['keyDown','focusIn','focusOut','change'],
        rule: function(context, eventType, event, params) {
          let result = {
            trigger: false,
            cancel: false,
            status: false // we'll do this within the rule
          };
          let value = context.get('value');
          let valueLength = value.length;
          let keyCode = event.keyCode;
          let controlKeys = context.get('_KEYBOARD.controlKeys');
           // anticipate incoming keystroke effect on length
          if (Ember.A([46,8]).contains(keyCode)) {
            valueLength = valueLength - 1; // backspace, delete key
          } else if (!controlKeys.contains(keyCode)) {
            valueLength = valueLength + 1; // non control character adds to length
          }
          let limit = context.get('length');
          
          let warningThreshold = params.warning ? params.warning : null;
          let errorThreshold = params.error ? params.error : null;
          if (!errorThreshold && !warningThreshold) {
            if (limit && params.value) {
              errorThreshold = limit;
              warningThreshold = params.value;
            } else if (valueLength) {
              errorThreshold = limit;
            } else {
              console.warn('There was no length property set and no parameter for the lengthWarn rule; rule will be ignored.');
              return result;
            }
          }
          if(valueLength >= errorThreshold ) {
            context.set('status','error');
            result.trigger = true;
          } else if (valueLength >= warningThreshold) {
            context.set('status','warning');
            result.trigger = true;
          } else {
            context.set('status','default');
            result.trigger = false;
          }

          return result;
        } // end rule()
      } 
    ]
  ]
});


SharedTextRules[Ember.NAME_KEY] = 'Shared Text Rules';
export default SharedTextRules; 