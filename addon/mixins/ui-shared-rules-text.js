import Ember from 'ember';

var SharedTextRules = Ember.Mixin.create({
  
  _rulesTypeLibrary: [
    // Length Limit 
    [ 
      'lengthLimit', 
      {
        events: ['keyDown'],
        rule: function(context, eventType, event) {
          let result = { animate: false, sound: false, event: false };
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
            result = {
              event: true,
              animate: true,
              sound: true,
            };
            if(!controlKeys.contains(keyCode)) {
              result.cancel = true;
            }
          }
          return result;
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
          }
          let value = context.get('value');
          let valueLength = value.length;
          let keyCode = event.keyCode;
          let controlKeys = context.get('_KEYBOARD.controlKeys');
          let keyCombos = context.get('_KEYBOARD.keyCombos');
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
    ],
    // Invalid Email
    [ 
      'invalidEmail', 
      {
        events: ['focusOut','keyDown'],
        rule: function(context, eventType, event) {
          let result = false;
          let emailAddress = context.get('value');
          let valid = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;
          let debounceTimeout = eventType === 'keyDown' ? 500 : 50;
          let severity = eventType === 'keyDown' ? 'warning' : 'error';
          let keyCode = event.keyCode;
          let controlKeys = context.get('_KEYBOARD.controlKeys');
          if(keyCode === 9) {
            return { trigger: false, cancel: false }; // ignore tab key 
          }
          if (!valid.test(emailAddress)) {
            Ember.run.debounce(this, () => {
              console.log('email problem from %s', eventType);
              context.set('status', severity);                
            }, debounceTimeout);
            result = {
              trigger: true,
              cancel: false
            };
          } else {
            console.log('email solved from %s', eventType);
            context.set('status', 'default');
          }
          return result;                      
        } // end rule()
      } 
    ]
  ]
});


SharedTextRules[Ember.NAME_KEY] = 'Shared Text Rules';
export default SharedTextRules; 