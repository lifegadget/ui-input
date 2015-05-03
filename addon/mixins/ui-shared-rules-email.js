/*jshint unused:false*/
import Ember from 'ember';

var SharedEmailRules = Ember.Mixin.create({
  
  _rulesEmailLibrary: [
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
          if(keyCode === 9) {
            return { trigger: false, cancel: false }; // ignore tab key 
          }
          if (!valid.test(emailAddress)) {
            Ember.run.debounce(this, () => {
              context.set('status', severity);                
            }, debounceTimeout);
            result = {
              trigger: true,
              cancel: false
            };
          } else {
            context.set('status', 'default');
          }
          return result;                      
        } // end rule()
      } 
    ],
    [ 
      'invalidDomain', 
      {
        events: ['focusIn','focusOut'],
        rule: function(context, eventType, event, params) {
          let result = {
            trigger: false,
            cancel: false,
            status: false // we'll do this within the rule
          };
          let { email, domain } = context.get('value').split('@');
          console.log('domain is: %', domain);
          
          return result;
        } // end rule()
      } 
    ]
  ]
});


SharedEmailRules[Ember.NAME_KEY] = 'Shared Email Rules';
export default SharedEmailRules; 