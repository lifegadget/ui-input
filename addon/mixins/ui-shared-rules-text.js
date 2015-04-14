import Ember from 'ember';

export default Ember.Mixin.create({
  
  _rulesTypeLibrary: [
    // Length Limit 
    [ 
      'lengthLimit', 
      {
        events: ['keyDown'],
        defaultAnimation: null,
        defaultSound: null,
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
        events: ['keyDown'],
        defaultAnimation: null,
        defaultSound: null,
        rule: function(context, eventType, event) {
          let result = { animate: false, sound: false, event: false };
          let keyCode = event.keyCode;
          let value = context.get('value');
          let valueLength = value.length;
          let controlKeys = context.get('_KEYBOARD.controlKeys');
          let keyCombos = context.get('_KEYBOARD.keyCombos');
           // anticipate incoming keystroke effect on length
          if (Ember.A([46,8]).contains(keyCode)) {
            valueLength = valueLength - 1; // backspace, delete key
          } else if (!controlKeys.contains(keyCode)) {
            valueLength = valueLength + 1; // non control character adds to length
          }
          let limit = context.get('length');
          console.log('lengthWarn [%s]: %s, %s', context.get('value'), valueLength, limit);
          
          if(limit && valueLength > limit) {
            result = {
              event: true,
              animate: true,
              sound: true,
              status: 'warning'
            };
          } else {
            result.status = 'default';
          }
          return result;
        } // end rule()
      } 
    ],
    // Invalid Email
    [ 
      'invalidEmail', 
      {
        events: ['focusOut'],
        defaults: new Set(
          ['status', {id:'warning'}],
          ['foo', {id:'bar'}]
        ),
        rule: function(context, eventType, event) {
          let result = { };
          let validEmail = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/;
          if (!validEmail.test(context.get('value'))) {
            console.log('invalid email');
            result = {
              trigger: true,
            }
          } else {
            console.log('valid email');
          }
          return result;
        } // end rule()
      } 
    ]
  ]
});